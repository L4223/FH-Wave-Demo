import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import 'controllers/user_controller.dart';
import 'services/backend.dart';
import 'splash_screen.dart';

dynamic screenSize;

UserController userController = UserController();
User? user = userController.currentUser;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Real Firebase, or in-memory demo data (default on web), see Backend.
  await Backend.init();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SplashScreen(),
    );
  }
}
