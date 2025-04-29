"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button, Input, Link, Form } from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function Component() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://172.23.219.207:8443/api/v2/auth/login",
        {
          username,
          password,
        }
      );

      const { token } = response.data.data;

      if (token) {
        document.cookie = `token=${token}; path=/; max-age=3600; secure; SameSite=Strict`;
        localStorage.setItem("token", token);
        router.push("/dashboard");
      } else {
        setError("Login failed: No token received.");
      }
    } catch (err: any) {
      console.error(err);
      setError("Login failed: Invalid credentials or server error.");
    }
  };

  return (
    <div className={"flex h-screen w-full items-center justify-center"}>
      <Image
        className="absolute w-full h-full object-cover"
        src={"/login_bg.jpg"}
        quality={100}
        alt="Logo"
        width={1920}
        height={1080}
      />
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6 bg-white z-10">
        <Image
          className="mx-auto mb-4"
          src={"/logo.png"}
          quality={100}
          alt="Logo"
          width={96}
          height={96}
        />
        <Form
          className="flex flex-col gap-4"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your uesername"
            type="text"
            variant="bordered"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button className="w-full" color="primary" type="submit">
            Log In
          </Button>
        </Form>
        <p className="text-center text-small">
          <Link href="#" size="sm">
            Public Page Status
          </Link>
        </p>
      </div>
    </div>
  );
}
