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
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useOutletContext, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import TransactionTable from "./TransactionTable";

const SignupDialogTemplate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook
  // const { setUser } = useOutletContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline-light">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="display-4">Register</DialogTitle>
        </DialogHeader>

        <DialogHeader>
          <DialogTitle>Enter Your Email and Password to Register</DialogTitle>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4"> */}
        <div>
          {/* <div className="grid grid-cols-4 items-center gap-4"> */}
          <div>
            <Form
              onSubmit={async (e) => [
                setUser(await userRegistration(email, password)),
                navigate("/"),
                await userConfirmation(),
                navigate("/"),
                e.preventDefault(),
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
                  placeholder="Enter Password"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <Form></Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SignupDialogTemplate;
