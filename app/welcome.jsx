// Import necessary modules and components
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'; // Core React Native components
import React from 'react'; // React for components
import ScreenWrapper from '../components/ScreenWrapper'; // Custom wrapper for consistent screen styling
import { hp, wp } from '../helpers/common'; // Helper functions for responsive design
import { theme } from '../constants/theme'; // Theme constants for styling
import Button from '../components/Button'; // Custom button component
import { useRouter } from 'expo-router'; // Router for navigation
import { StatusBar } from 'expo-status-bar'; // Status bar from Expo


// Welcome component definition
const Welcome = () => {

  const router = useRouter(); // Router instance for navigation

  return (
    // Screen wrapper for consistent background color and padding
    <ScreenWrapper bg="white">
      <StatusBar style="dark"/> {/* Dark style for the status bar */}
      <View style={styles.container}>
        {/* Welcome image */}
        <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/welcome.png')} />
      
        {/* Title and punchline */}
        <View style={{gap: 20}}>
          <Text style={styles.title}>LinkUp!</Text>
          <Text style={styles.punchline}>
            Where every thought finds a home and every image tells a story.
          </Text>
        </View>

        {/* Footer with buttons */}
        <View style={styles.footer}>
          {/* Getting Started button */}
          <Button
            title="Getting Started"
            buttonStyle={{marginHorizontal: wp(3)}}
            onPress={()=> router.push('signUp')}
          />

          {/* Login text with link */}
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>
              Already have an account!
            </Text>
            <Pressable onPress={()=> router.push('login')}>
              <Text style={[styles.loginText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>

      </View>

    </ScreenWrapper>
  )
}

export default Welcome // Export the Welcome component as the default export

// Styles for the Welcome component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingHorizontal: wp(4)
    },
    welcomeImage: {
        height: hp(30),
        width: wp(100),
        alignSelf: 'center'
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold
    },
    punchline: {
      textAlign: 'center',
      paddingHorizontal: wp(10),
      fontSize: hp(1.7),
      color: theme.colors.text
    },
    footer: {
      gap: 30,
      width: '100%'
    },
    bottomTextContainer:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5
    },
    loginText:{
      textAlign:'center',
      color: theme.colors.text,
      fontSize: hp(1.6)
    }
})