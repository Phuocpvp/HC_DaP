// import 'package:client/screens/Login-Screen.dart';
import 'package:client/entry_point.dart';
import 'package:client/screens/Home.dart';
import 'package:client/screens/healthTracking/Disease_screen.dart';
import 'package:client/screens/TestData.dart';
import 'package:client/screens/Profile.dart';
import 'package:client/screens/Update_Info.dart';
import 'package:client/screens/healthTracking/BodyIndex.dart';
import 'package:client/screens/healthTracking/HealthGoals.dart';
import 'package:client/screens/healthTracking/Sleep.dart';
import 'package:client/screens/healthTracking/StepCount.dart';
import 'package:client/screens/login_screen.dart';
import 'package:client/screens/signup_screen.dart';
import 'package:flutter/material.dart';
// import '../screens/Login.dart';

class AppRoutes {
  static const String login = '/';
  static const String register = '/register';
  static const String testdata = '/testdata';
  static const String homeScrean = '/home';
  static const String profile = '/profile';
  static const String update = '/update';
  static const String disease = '/disease';
  static const String entry = '/entry';
  static const String sleep = '/sleep';
  static const String healthGoals = '/healthGoals';
  static const String bodyIndex = '/bodyIndex';
  static const String stepCount = '/stepCount';

  static Map<String, WidgetBuilder> get routes {
    return {
      login: (context) => const LoginScreen(),
      register: (context) => const SignUpScreen(),
      testdata: (context) => DataScreen(),
      homeScrean: (context) => HomeScreen(),
      profile: (context) => UserInfo(),
      update: (context) => UpdateInfo(),
      disease: (context) => Disease(),
      entry: (context) => const EntryPoint(),
      sleep: (context) => UpdateSleepDataScreen(),
      healthGoals: (context) => HealthGoals(),
      bodyIndex: (context) => UpdateBodyIndexScreen(),
      stepCount: (context) => const StepCountScreen(),
    };
  }
}