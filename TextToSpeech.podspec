
  Pod::Spec.new do |s|
    s.name = 'TextToSpeech'
    s.version = '0.0.1'
    s.summary = 'A native plugin for text to speech engine'
    s.license = 'MIT'
    s.homepage = 'https://github.com/capacitor-community/text-to-speech'
    s.author = 'Priyank Patel <priyank.patel@stackspace.ca>'
    s.source = { :git => 'https://github.com/capacitor-community/text-to-speech', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '11.0'
    s.static_framework = true
    s.dependency 'Capacitor'
    s.dependency 'CapacitorCordova'
  end