import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fake_cloud_firestore/fake_cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_auth_mocks/firebase_auth_mocks.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

import '../firebase_options.dart';

/// Demo mode runs the app without the original Firebase project: auth and
/// Firestore are replaced by in-memory fakes seeded with sample data.
///
/// On by default for web builds (the public demo). Override with
/// `--dart-define=DEMO=false` to use the real Firebase backend.
const bool kDemoMode = bool.fromEnvironment('DEMO', defaultValue: kIsWeb);

/// Single access point for Firebase services, so the whole app can switch
/// between the real backend and the demo backend in one place.
class Backend {
  Backend._();

  static late final FirebaseAuth auth;
  static late final FirebaseFirestore firestore;

  static Future<void> init() async {
    if (kDemoMode) {
      final store = FakeFirebaseFirestore();
      await DemoData.seed(store);
      firestore = store;
      auth = MockFirebaseAuth(signedIn: true, mockUser: DemoData.user);
      return;
    }
    await Firebase.initializeApp(
        name: "FH-Wave", options: DefaultFirebaseOptions.currentPlatform);
    auth = FirebaseAuth.instance;
    firestore = FirebaseFirestore.instance;
  }
}

/// Fictional sample data for the demo. Shapes match what the controllers
/// read and write (`users`, `groups`, `groups/{id}/appointments`).
class DemoData {
  DemoData._();

  static const uid = 'demo-user';

  static final user = MockUser(
    uid: uid,
    email: 'demo@student.fh-kiel.de',
    displayName: 'Alex',
    isEmailVerified: true,
  );

  static Future<void> seed(FirebaseFirestore db) async {
    final users = {
      uid: 'Alex',
      'u-mia': 'Mia',
      'u-jonas': 'Jonas',
      'u-lena': 'Lena',
      'u-paul': 'Paul',
    };
    final groups = {
      'g-lerngruppe': _Group('Lerngruppe Medieninformatik', uid,
          [uid, 'u-mia', 'u-jonas']),
      'g-projekt': _Group('Projekt Agile Entwicklung', 'u-mia',
          [uid, 'u-mia', 'u-lena', 'u-paul']),
      'g-mensa': _Group('Mensa-Runde', 'u-jonas', ['u-jonas', 'u-paul']),
    };

    for (final entry in users.entries) {
      final memberOf = groups.entries
          .where((g) => g.value.members.contains(entry.key))
          .map((g) => g.key)
          .toList();
      await db.collection('users').doc(entry.key).set({
        'userName': entry.value,
        'uid': entry.key,
        'userMail': '${entry.value.toLowerCase()}@student.fh-kiel.de',
        'groups': memberOf,
        // Alex has an open invitation to the Mensa group.
        'group_requests': entry.key == uid ? ['g-mensa'] : <String>[],
      });
    }

    for (final entry in groups.entries) {
      await db.collection('groups').doc(entry.key).set({
        'groupId': entry.key,
        'groupName': entry.value.name,
        'creatorId': entry.value.creator,
        'members': entry.value.members,
      });
    }

    final today = DateTime.now();
    DateTime at(int dayOffset, int hour, [int minute = 0]) => DateTime(
        today.year, today.month, today.day + dayOffset, hour, minute);

    final appointments = {
      'g-lerngruppe': [
        _Appointment('Klausurvorbereitung Mathe', at(1, 10), at(1, 12),
            0xFF4F9DFF),
        _Appointment('Übungsblatt 5 besprechen', at(3, 14), at(3, 15, 30),
            0xFFFFB648),
      ],
      'g-projekt': [
        _Appointment('Sprint Planning', at(0, 9), at(0, 10), 0xFF7BC67E),
        _Appointment('Daily Stand-up', at(2, 9), at(2, 9, 15), 0xFF7BC67E),
        _Appointment('Sprint Review', at(6, 13), at(6, 14, 30), 0xFFE86F68),
      ],
    };
    for (final entry in appointments.entries) {
      for (final a in entry.value) {
        await db
            .collection('groups')
            .doc(entry.key)
            .collection('appointments')
            .add({
          'title': a.title,
          'startTime': Timestamp.fromDate(a.start),
          'endTime': Timestamp.fromDate(a.end),
          'color': a.color,
          'isAllDay': false,
        });
      }
    }

    await db.collection('users').doc(uid).set({
      'availability': [for (final d in [1, 2, 4]) at(d, 0).toIso8601String()],
    }, SetOptions(merge: true));
  }
}

class _Group {
  const _Group(this.name, this.creator, this.members);
  final String name;
  final String creator;
  final List<String> members;
}

class _Appointment {
  const _Appointment(this.title, this.start, this.end, this.color);
  final String title;
  final DateTime start;
  final DateTime end;
  final int color;
}
