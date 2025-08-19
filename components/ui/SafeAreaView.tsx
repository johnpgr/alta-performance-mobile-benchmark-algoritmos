import React from "react"
import { Platform } from "react-native"
import {
  SafeAreaView as RNSafeAreaView,
  SafeAreaProviderProps
} from "react-native-safe-area-context"

export function SafeAreaView(props: SafeAreaProviderProps) {
  return (
    <RNSafeAreaView
      {...props}
      edges={Platform.select({ios: ["top", "bottom", "left", "right"], android: ["top", "left", "right"]})}
    >
      {props.children}
    </RNSafeAreaView>
  )
}
