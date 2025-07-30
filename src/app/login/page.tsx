"use client";

import { useState } from "react";
import { Flex, Input, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import Button from "@/base/components/Button/CustomButton";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  console.log("Email:", email);
  return (
    <Flex
      vertical
      style={{
        minHeight: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex
        vertical
        style={{
          maxWidth: 400,
          padding: 24,
          borderRadius: 8,
          width: "100%",
        }}
      >
        <Typography
          className="title-lg"
          style={{ textAlign: "center", marginBottom: 24 }}
        >
          Log in
        </Typography>

        <Flex vertical style={{ flexDirection: "column", gap: 12 }}>
          <Button
            icon={<GoogleOutlined />}
            style={{
              justifyContent: "center",
              background: "#fff",
              width: "100%",
              height: 42,
              borderRadius: 8,
            }}
          >
            Continue with Google
          </Button>
        </Flex>

        <hr style={{ margin: "32px 0", borderColor: "#eee" }} />

        <div style={{ marginBottom: 16 }}>
          <Typography>Email</Typography>
          <Input
            type="email"
            placeholder="Type your email"
            style={{
              marginTop: 8,
              height: 42,
              borderRadius: 8,
              fontSize: 16,
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button
          type="primary"
          disabled={!email}
          style={{
            height: 42,
            borderRadius: 8,
            background: !email ? "#e0e0e0" : "var(--primary-fg-color-primary-fg-50, #1890ff)",
            border: "none",
            color: !email ? "#888" : "var(--white, #ffffff)",
            width: "100%",
          }}
        >
          Continue
        </Button>

        <Flex style={{ justifyContent: "center", marginTop: 16 }}>
          <Typography>Forgot password? </Typography>
          <Link href="#" style={{ fontWeight: 600, marginLeft: 4 }}>
            <Typography>Reset</Typography>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
