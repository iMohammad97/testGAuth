import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import {
//     GOOGLE_WEB_CLIENT_ID,
//     GOOGLE_ANDROID_CLIENT_ID,
//     GOOGLE_IOS_CLIENT_ID,
// } from "@env";

GoogleSignin.configure({
    webClientId: "your web client id",
    androidClientId: "your android client id",
    iosClientId: "your ios client id",
    // scopes: ["profile", "email"],
});
const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    return await GoogleSignin.signIn();
};

export default function App() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const response = await GoogleLogin();
            const { idToken, user } = response;
            console.log("idToken", idToken);
            console.log("user", user);

            if (idToken) {
                // const resp = await authAPI.validateToken({
                //     token: idToken,
                //     email: user.email,
                // });
                // console.log("resp", resp);
                // await handlePostLoginData(resp.data);
            }
        } catch (apiError) {
            setError(
                apiError?.response?.data?.error?.message || "Something went wrong",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <TouchableOpacity onPress={handleGoogleLogin}><Text>Continue with Google</Text></TouchableOpacity>
        </View>
    );
}
