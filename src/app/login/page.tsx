"use client";

import { useState } from "react";
import { Flex, Form, Input, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import Button from "@/base/components/Button/CustomButton";
import Link from "next/link";
import useUserActions from "@/base/hooks/useUserActions";
import { LoginData } from "@/base/types/auth";
import useToast from "@/base/hooks/useToast";
import { useRouter } from "next/navigation";
import { useForm } from "antd/es/form/Form";
import { formConfig } from "@/base/configs/antdConfig";

export default function LoginPage() {
  const showToast = useToast();
  const router = useRouter();
  const [form] = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginSuccess } = useUserActions();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [userFormDataTemp, setUserFormDataTemp] = useState<any>({
    email: "",
    password: "",
  });
  const onSubmit = async (formData: LoginData) => {
    setIsLoading(true);
    try {
      if (formData?.otp) {
        formData = {
          ...userFormDataTemp,
          ...formData,
        };
      } else {
        setUserFormDataTemp(formData);
      }
      const res = await login({
        ...formData,
        // socketId: !!socket ? socket.id : undefined,
      });
      console.log("Login response:", res?.data);
      if (res?.success && res?.data?.customer) {
        const url = "/";
        let ans;

        // if (res?.data?.daysPassed >= 90) {
        //   ans = await confirm90();
        // } else if (res?.data?.daysPassed >= 80) {
        //   ans = await confirm80();
        // }

        // if (ans) {
        //   const customer = res?.data?.customer;
        //   setFindIdAtom({
        //     id: customer?.id,
        //     phone: customer?.mobilephone,
        //     name: customer?.name
        //   });
        //   router.push(`/findPassword/enterNewPassword`);
        // }
        // if (type) {
        //   switch (type) {
        //     case 'buymycar':
        //       url = `/buymycar/buycarstep?carId=${carId}`;
        //       break;
        //     case 'sellMyCar':
        //       url = `/sellMyCarHomePage?carRegNo=${carRegNo}&ownerName=${ownerName}`;
        //       break;
        //     case 'lease':
        //       url = `/used-car/rental-estimator-final?key=lease&id=${id}`;
        //       break;
        //     case 'newcar_final':
        //       url = `/new-car/rental-estimator/final?data=${finalEsKey}`;
        //       break;
        //     case 'used-car_rent':
        //       url = `/used-car/rental-estimator-final?key=rent&id=${id}&form-key-rent=${finalEsKey}`;
        //       break;
        //     default:
        //       url = `/`;
        //   }
        // } else {
        //   url =
        //     res?.data?.customer?.stage == CustomerStageEnum.AUCTION
        //       ? '/auction/stock-list'
        //       : res?.data?.customer?.stage == CustomerStageEnum.EXPORT
        //       ? '/export/stock-list'
        //       : '/';
        // }


        const result = await loginSuccess(res?.data);
        if (result) {
          showToast({
            content: "You have successfully logged in.",
            type: "success",
          });
          // if (socket) {
          //   // Gửi sự kiện login tới server
          //   socket.emit("login", formData.id);

          //   // Lắng nghe các sự kiện từ server nếu cần
          //   socket.on("connect", () => {
          //     console.log("Socket connected:", socket?.id);
          //   });

          //   socket.on("disconnect", () => {
          //     console.log("Socket disconnected.");
          //   });

          //   socket.on("logout", (message: string) => {
          //     console.log("Logout message from server:", message);
          //     alert(message);
          //     router.push("/login");
          //   });
          // }
          localStorage.setItem("loginTime", new Date().toISOString());
          localStorage.removeItem("sessionWarningDismissed");

          // if (savedID) {
          //   handleSaveLocalStore(formData.id);
          // } else {
          //   handleRemoveLocalStore();
          // }
          router.push(url);
          console.log("Login successful:", res, url);
        }
      } else {
        setError(true);
        console.error("Login failed:", error);
        if (res?.status === 401) {
          showToast({ content: 'Invalid email or password', type: 'error' });
        } else if (res?.status === 400) {
          showToast({ content: 'The information entered is not in the correct format.', type: 'error' });
        } else {
          showToast({ content: 'Login failed. Please try again.', type: 'error' });
        }
        // if (res?.error === 'customer_blocked') {
        //   form.setFields([
        //     {
        //       name: 'password',
        //       value: '',
        //       errors: ['아이디/비밀번호가 5회 이상 틀려 10분간 계정이 정지됩니다.']
        //     }
        //   ]);
        // } else {
        //   form.setFields([
        //     {
        //       name: 'password',
        //       value: '',
        //       errors: ['아이디/비밀번호를 5회 이상 틀릴 시 10분간 계정이 정지됩니다.']
        //     }
        //   ]);
        // }
        !localStorage.getItem('savedID') && form.resetFields(['id']);
      }
      setIsLoading(false);
      setLoading(false);
    } catch (error: any) {
      setError(error);
    }
  };

  const handleSaveLocalStore = (id: string) => {
    localStorage.setItem("savedID", id);
  };

  const handleRemoveLocalStore = () => {
    localStorage.removeItem("savedID");
  };
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
              height: 48,
              borderRadius: 8,
            }}
          >
            Continue with Google
          </Button>
        </Flex>

        <hr style={{ margin: "32px 0", borderColor: "#eee" }} />
        <Form
          form={form}
          labelCol={{
            style: { fontWeight: 600 },
          }}
          size={"large"}
          {...formConfig}
          onFinish={onSubmit}
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Flex vertical style={{ marginBottom: 24, width: "100%" }}>
            <Typography>Email</Typography>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                type="email"
                placeholder="Type your email"
                style={{
                  marginTop: 8,
                  height: 48,
                  borderRadius: 8,
                  fontSize: 16,
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
          </Flex>

          <Flex vertical style={{ marginBottom: 24, width: "100%" }}>
            <Typography>Password</Typography>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input
                type="password"
                placeholder="Type your password"
                style={{
                  marginTop: 8,
                  height: 48,
                  borderRadius: 8,
                  fontSize: 16,
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
          </Flex>
          <Button
            type="primary"
            disabled={!email.trim() || !password.trim()}
            style={{
              height: 48,
              borderRadius: 8,
              background:
                !email.trim() || !password.trim()
                  ? "#e0e0e0"
                  : "var(--primary-fg-color-primary-fg-50, #1890ff)",
              border: "none",
              color: !email.trim() || !password.trim() ? "#888" : "var(--white, #ffffff)",
              width: "100%",
            }}
            htmlType="submit"
          >
            Continue
          </Button>
        </Form>

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
