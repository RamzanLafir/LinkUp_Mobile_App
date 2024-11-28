// Import necessary modules and components from React Native and other libraries
import { View, Text, LogBox } from 'react-native' // Core React Native components
import React, { useEffect } from 'react' // React for components and hooks
import { Stack, useRouter } from 'expo-router'  // Expo router for navigation
import { AuthProvider, useAuth } from '../constants/AuthContext' // Custom authentication context
import { supabase } from '../lib/superbase' // Supabase client instance
import { getUserData } from '../services/userService' // Service to fetch user data

// Ignore specific warnings from the console to clean up logs
LogBox.ignoreLogs(['Warning: TNodeChildrenRender', 'Warning: TRenderEngineProvider','Warning: MemoizedTNodeRenderer'])

// Higher-order component wrapping the main layout with an AuthProvider
const _layout = () => {
  return(
    <AuthProvider>
      <MainLayout/>
    </AuthProvider>
  )
}

// Main layout component
const MainLayout = () => {

  // Extract context methods for managing authentication state
  const {setAuth, setUserData} = useAuth();
  const router = useRouter(); // Router instance for navigation

  // Effect to listen for authentication state changes
  useEffect(()=>{
     // Supabase auth listener
    supabase.auth.onAuthStateChange((_event, session) =>{
      console.log('session user: ', session?.user.id);  // Log the current user ID

      // If a session exists, set the user in context and update user data
      if(session){
        setAuth(session?.user); // Update auth state with the session user
        updateUserData(session?.user, session?.user?.email); // Fetch and set user data
        router.replace('/home'); // Redirect to home page
      }else{
        // If no session, clear auth state and redirect to the welcome page
        setAuth(null);
        router.replace('/welcome'); 
      }

    })
  },[]); // Empty dependency array ensures this runs once on mount

  // Function to fetch and update user data
  const updateUserData = async (user, email)=>{
    let res = await getUserData(user?.id); // Fetch user data using the service
    //console.log('Got user data: ',res);
    // If the API call succeeds, update user data in context
    if(res.success) setUserData({...res.data, email});
    
  }

  // Return a stack navigator with screen options
  return (
    <Stack
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen
          name="(main)/postDetails"
          options={{
            presentation: 'modal'
          }}
        />
    </Stack>
  )
}

export default _layout // Export the main layout as the default export