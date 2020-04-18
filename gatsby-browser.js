import React from "react";
import Layout from "./src/components/layout";
import Amplify, { Auth } from 'aws-amplify'
import awsConfig from './src/aws-exports'
Amplify.configure(awsConfig)

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};