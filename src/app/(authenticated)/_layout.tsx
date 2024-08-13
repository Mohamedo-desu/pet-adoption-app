import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
const AuthenticatedLayout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/(public)/"} />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="pet_details"
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
    </Stack>
  );
};
export default AuthenticatedLayout;
