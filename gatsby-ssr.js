import React from "react";
import Layout from "./src/components/layout";
import Amplify, { Auth } from 'aws-amplify'
import awsConfig from './aws-exports.js'
Amplify.configure(awsConfig)

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};