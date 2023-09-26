import React from 'react';
import { useState, useEffect } from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <>
      <div>TEST LOGIN PAGE</div>
      <SignupForm />
      <LoginForm />
    </>
  );
}

export default LoginPage;
