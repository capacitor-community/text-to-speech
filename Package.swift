// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorCommunityTextToSpeech",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapacitorCommunityTextToSpeech",
            targets: ["TextToSpeechPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "TextToSpeechPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/TextToSpeechPlugin"),
        .testTarget(
            name: "TextToSpeechPluginTests",
            dependencies: ["TextToSpeechPlugin"],
            path: "ios/Tests/TextToSpeechPluginTests")
    ]
)