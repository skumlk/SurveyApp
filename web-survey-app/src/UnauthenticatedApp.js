import React from "react"
import { Route, Link, Switch } from "react-router-dom";
import { useFormik } from 'formik';
import { Flex, Spacer, Heading, Button, Input } from "@chakra-ui/react"
import { useAuth } from "./services/auth";

function Login() {

  const { login } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    onSubmit: values => {
      const handleLogin = async () => {
        const data = await login.mutate({email: values.email, password: values.password})
      }

      handleLogin()
    },
  });

  return <React.Fragment>
    <form onSubmit={formik.handleSubmit} className="m-auto h-full w-full">
      <Flex align="center" justify="center" direction="column" className="h-full mx-auto" style={{ width: '500px' }}>
        <Heading as="h3">Login</Heading>
        <div className="w-full">
          <label htmlFor="email" className="mb-5">Email Address</label>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-100 mb-5"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="mb-5">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full mb-5"
          />
        </div>
        <Button type="submit" className="mb-5">Login</Button>
        <div>You don't have an account? <Link to="/register">Register</Link></div>
      </Flex>
    </form>
  </React.Fragment>
}

function Register() {

  const { register } = useAuth()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },

    onSubmit: values => {
      const handleRegister = async () => {
        const { email, name, password} = values
        const data = await register.mutate({email, name, password})
      }

      handleRegister()
    },
  });

  return <React.Fragment>
    <form onSubmit={formik.handleSubmit} className="m-auto h-full w-full">
      <Flex align="center" justify="center" direction="column" className="h-full mx-auto" style={{ width: '500px' }}>
        <Heading as="h3">Register</Heading>
        <div className="w-full">
          <label htmlFor="email" className="mb-5">Full Name</label>
          <Input
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-100 mb-5"
          />
        </div>
        <div className="w-full">
          <label htmlFor="email" className="mb-5">Email Address</label>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-100 mb-5"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="mb-5">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full mb-5"
          />
        </div>
        <Button type="submit" className="mb-5">Register</Button>
        <div>You already have an account? <Link to="/login">Login</Link></div>
      </Flex>
    </form>
  </React.Fragment>
}

function UnauehenticatedApp() {
  return (
    <Switch>
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/" component={Login} exact />
    </Switch>
  );
}

export default UnauehenticatedApp;