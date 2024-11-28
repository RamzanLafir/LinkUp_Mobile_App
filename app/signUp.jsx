// Import necessary modules and components
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'; // Core React Native components
import React, { useRef, useState } from 'react'; // React for components and hooks
import ScreenWrapper from '../components/ScreenWrapper'; // Custom wrapper for consistent screen styling
import { theme } from '../constants/theme'; // Theme constants for styling
import Icon from '../assets/icons'; // Custom icon component
import { StatusBar } from 'expo-status-bar'; // Status bar from Expo
import BackButton from '../components/BackButton'; // Custom back button component
import { useRouter } from 'expo-router'; // Router for navigation
import { hp, wp } from '../helpers/common'; // Helper functions for responsive design
import Input from '../components/Input'; // Custom input component
import Button from '../components/Button'; // Custom button component
import { superbaseUrl } from '../constants'; // Supabase URL constant
import { supabase } from '../lib/superbase'; // Supabase client instance

// SignUp component definition
const SignUp = () => {

    const router = useRouter(); // Router instance for navigation
    const emailRef = useRef(''); // Reference to hold email input value
    const nameRef = useRef(''); // Reference to hold name input value
    const passwordRef = useRef(''); // Reference to hold password input value
    const [loading, setLoading] = useState(false); // State to manage loading status

    // Function to handle form submission
    const onSubmit = async ()=>{
        // Validate input fields
        if(!emailRef.current || !passwordRef.current)
        {
            Alert.alert('Sign Up',"Please fill all the fields!");
            return;
        }

        // Get trimmed values from inputs
        let name = nameRef.current.trim();
        let email = emailRef.current.trim();
        let password = passwordRef.current.trim();

        setLoading(true); // Set loading to true before the API call

        // Attempt to sign up with Supabase
        const {data:{session}, error} = await supabase.auth.signUp({
            email,
            password,
            options:{
                data:{
                    name
                }
            }
        });

        // Set loading to false after the API call
        setLoading(false);

        // console.log('session: ', session);
        // console.log('error: ',error);

        if(error){
            Alert.alert('Sign Up',error.message);
        }
    }

  return (
    // Screen wrapper for consistent background color and padding
    <ScreenWrapper bg="white">
      <StatusBar style="dark"/>
      <View style={styles.container}>
         {/* Back button for navigation */}
        <BackButton router={router}/>

        {/* Welcome message */}
        <View>
            <Text style={styles.welcomeText}>Let's</Text>
            <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* Form container */}
        <View style={styles.form}>
            <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
                Please fill the details to create an account
            </Text>

            {/* Name input field */}
            <Input
                icon = {<Icon name="user" size={26} strokeWidth={1.6}/>}
                placeholder = "Enter your name"
                onChangeText={value=> nameRef.current = value}
            />

            {/* Email input field */}
            <Input
                icon = {<Icon name="mail" size={26} strokeWidth={1.6}/>}
                placeholder = "Enter your email"
                onChangeText={value=> emailRef.current = value}
            />
            {/* Password input field */}
            <Input
                icon = {<Icon name="lock" size={26} strokeWidth={1.6}/>}
                placeholder = "Enter your password"
                secureTextEntry
                onChangeText={value=> passwordRef.current = value}
            />

             {/* Sign Up button */}
            <Button title={'Sign Up'} loading={loading} onPress={onSubmit} />

            {/* Footer with login link */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Already have an account?
                </Text>
                <Pressable onPress={()=> router.push('login')}>
                    <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>Login</Text>
                </Pressable>
            </View>

        </View>
      </View>
    </ScreenWrapper>
  )
}

export default SignUp
// Styles for the SignUp component
const styles = StyleSheet.create({
    container:{
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5)
    },
    welcomeText:{
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text
    },
    form:{
        gap:25
    },
    forgotPassword:{
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text
    },
    footer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    footerText:{
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    }
})