'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "dc0e5efd791514075e8db1e1362cc038",
"assets/AssetManifest.json": "1dc78ff4b2a48e2ecf1812924fa0e244",
"assets/assets/ausgeglichen.svg": "847591d62953fdc97e3d6650b2092a91",
"assets/assets/calendar.svg": "e3e21ffbe4349653745078b04e8aa359",
"assets/assets/felix.jpg": "9e605b315f67b9822efca04cc4d12e27",
"assets/assets/fhwave-loading-schwarz.gif": "253048551e217ed1e6ab5493d925941b",
"assets/assets/fhwave-loading-standard.gif": "9b5069248c8521b7a13e74dc74675c57",
"assets/assets/fhwave-loading-weiss-schwarz.gif": "1c2468709436f6279fbe93efb998bea1",
"assets/assets/fhwave-loading-weiss.gif": "3b36fbf9e5962ff4622aa94481fbf98b",
"assets/assets/fhwave_logo.svg": "19011ec7a843bcb3fd0d049f833a438a",
"assets/assets/fhwave_logo_weiss.svg": "f6b9a97a40e6826d9aeaa33b3530c53c",
"assets/assets/fruehaufsteher.svg": "ed090967a5fa3a3d141775b2803f38c3",
"assets/assets/intro.mp4": "7ab276cbc9e01ce8aec7801c0d5e1ded",
"assets/assets/json/stats.json": "08f3b415fe354b1e605696c9744aaf2d",
"assets/assets/map.svg": "5a9cb6c8532a4fc32d694af9e5ac10cb",
"assets/assets/mapStyle.json": "e193f59f01d368eb583c4d9b6045fd53",
"assets/assets/schedule.svg": "8c8bfe9ff01939cd02bb8dc80ebf6192",
"assets/assets/team.svg": "c03c6d8a66bcc7dceaaa85753e9fd8b2",
"assets/FontManifest.json": "08ba223a6dc654b4b6c1018d01c45fa8",
"assets/fonts/MaterialIcons-Regular.otf": "7dca8b2d17eb43594c8b7d178dc341c4",
"assets/fonts/Roboto-Black.ttf": "56aa07e4f2f764e31cb09d8ad1362808",
"assets/fonts/Roboto-BlackItalic.ttf": "cb78d8420ac5bc66e3606dd582d5bc08",
"assets/fonts/Roboto-Bold.ttf": "fb6210739c4993c1a86f812e6502e471",
"assets/fonts/Roboto-BoldItalic.ttf": "8fee5306f412b2bd3a5129fe9bba9265",
"assets/fonts/Roboto-Italic.ttf": "9b6488bdc5881a71f018252ae53cc864",
"assets/fonts/Roboto-Light.ttf": "01744b0f7878c20cdcbd7b3a18040d33",
"assets/fonts/Roboto-LightItalic.ttf": "a97f2290ca761625258702295e02d799",
"assets/fonts/Roboto-Medium.ttf": "b21ffa747200921845e38910b8ea97c0",
"assets/fonts/Roboto-MediumItalic.ttf": "2b2e515558cca03d7455ea5039c64c10",
"assets/fonts/Roboto-Regular.ttf": "afe8eacfc0903cc0612dc696881f0480",
"assets/fonts/Roboto-Thin.ttf": "ad0fb8cf3e91768b11388432acb16ca3",
"assets/fonts/Roboto-ThinItalic.ttf": "7c33e4301357ec4164edfc9ff55be6ec",
"assets/NOTICES": "cff146fd66360bd400c8c033982d9452",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/timezone/data/latest_all.tzf": "871b8008607c14f36bae2388a95fdc8c",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "8ffb0662dcd01bba7bdd7d9085f7c7d1",
"/": "8ffb0662dcd01bba7bdd7d9085f7c7d1",
"main.dart.js": "3476d85caaa7787650ff3ba2fec461f8",
"manifest.json": "442398d57e970dbba0a0a9db6a87e1a6",
"version.json": "be5ac3b94a0563034531140d21034d53"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
