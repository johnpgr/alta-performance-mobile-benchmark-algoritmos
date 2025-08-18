import React from "react"
import {
  SafeAreaView as RNSafeAreaView,
  SafeAreaProviderProps
} from "react-native-safe-area-context"

export function SafeAreaView(props: SafeAreaProviderProps) {
  return (
    <RNSafeAreaView
      {...props}
      edges={["top", "left", "right"]}
    >
      {props.children}
    </RNSafeAreaView>
  )
}
