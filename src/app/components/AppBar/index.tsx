import { Avatar, Flex } from "antd";
import React from "react";
import BrandLogo from "../BrandLogo";
import Link from "next/link";
import Button from "@/base/components/Button/CustomButton";
import Container from "@/base/components/Container";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { authAtom } from "@/base/store/atoms/auth";
import useToast from "@/base/hooks/useToast";
import useUserActions from "@/base/hooks/useUserActions";

export default function MyAppBar() {
  const router = useRouter();
  const showToast = useToast();
  const [authData] = useRecoilState(authAtom);

  const { logout } = useUserActions();
  const handleLoginClick = () => {
    router.push("/login");
  };
  const handleRegisterClick = () => {
    router.push("/register");
  };
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout(authData?.customer?.accessToken || "");
    showToast({ content: "Logout successful", type: "success" });
    router.push("/");
  };
  return (
    <div
      style={{
        position: "sticky",
        top: 20,
        zIndex: 99,
        transition: "box-shadow 0.3s ease",
      }}
      className="app-bar"
    >
      <Container>
        <Flex
          style={{
            padding: "16px 24px",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--base-bg-color-base-bg-10, #e0dedc)",
            borderRadius: 24,
          }}
        >
          <BrandLogo />
          <Flex style={{ alignItems: "center", gap: 16 }}>
            <Link
              href="/practice"
              style={{
                margin: "0 10px",
                color: "var(--black, #101010)",
              }}
            >
              Practice
            </Link>
            <Link
              href="/feedback"
              style={{
                margin: "0 10px",
                color: "var(--black, #101010)",
              }}
            >
              Feedback
            </Link>
            <Link
              href="https://github.com/win78py"
              style={{
                margin: "0 10px",
                color: "var(--black, #101010)",
              }}
            >
              Github
            </Link>

            <Flex style={{ gap: 8 }}>
              {authData.isLoggedIn ? (
                <Flex style={{ alignItems: "center", gap: 16 }}>
                  <Link href={`/workspace?id=${authData.customer?.id}`} style={{ color: "var(--black, #101010)" }}>
                    <Avatar size={38} src={authData.customer?.profileImage} />
                  </Link>    
                  <Button
                    style={{
                      background:
                        "var(--primary-fg-color-primary-fg-0, #ffffff)",
                      color: "var(--black, #101010)",
                      border:
                        "0px solid var(--primary-fg-color-primary-fg-50, #1677ff)",
                      borderRadius: 10,
                      height: 38,
                      padding: "10px 28px",
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Flex>
              ) : (
                <>
                  <Button
                    style={{
                      background:
                        "var(--primary-fg-color-primary-fg-50, #1677ff)",
                      color: "#fff",
                      borderRadius: 10,
                      height: 38,
                      padding: "10px 28px",
                    }}
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                  <Button
                    style={{
                      background:
                        "var(--primary-fg-color-primary-fg-0, #ffffff)",
                      color: "var(--black, #101010)",
                      border:
                        "0px solid var(--primary-fg-color-primary-fg-50, #1677ff)",
                      borderRadius: 10,
                      height: 38,
                      padding: "10px 28px",
                    }}
                    onClick={handleRegisterClick}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
