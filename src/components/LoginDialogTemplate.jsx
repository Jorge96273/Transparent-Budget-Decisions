// import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useOutletContext, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const LoginDialog = ({ setUser, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { setUser } = useOutletContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline-light">Log In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="display-4">Login</DialogTitle>
          <DialogTitle>
            Enter your email below to login to your account.
          </DialogTitle>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4"> */}
        <div>
          {/* <div className="grid grid-cols-4 items-center gap-4"> */}
          <div>
            <Form
              onSubmit={async (e) => [
                e.preventDefault(),
                setUser(await userLogIn(email, password)),
              ]}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <div className="text-center">{/* ADD FINCTIONALITY */}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default LoginDialog;
