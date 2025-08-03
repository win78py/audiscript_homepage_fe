"use client";

import { useState } from "react";
import { Col, Flex, Form, Input, message, Row, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import Button from "@/base/components/Button/CustomButton";
import Link from "next/link";
import useUserActions from "@/base/hooks/useUserActions";
import { LoginData } from "@/base/types/auth";
import useToast from "@/base/hooks/useToast";
import { useRouter } from "next/navigation";
import { useForm } from "antd/es/form/Form";
import { formConfig } from "@/base/configs/antdConfig";
import { useUserMutation } from "./hooks/useUserMutation";
import { useUserContext } from "./contexts/UserContext";
import WriteItem, { FieldWriteForm } from "@/base/components/WriteItem";
import {
  DynamicEmailForm,
  dynamicEmailValidator,
} from "@/base/components/DynamicEmailForm";
import InputAlphaNumericOnly from "@/base/components/InputAlphaNumericOnly";

export default function RegisterPage() {
  const showToast = useToast();
  const router = useRouter();
  const [form] = useForm();

  const { mCreate } = useUserMutation();
  const { userData, updateUserData } = useUserContext();
  const [errorMsg, setErrorMsg] = useState<{ [key: string]: string }>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  console.log("isCompleted:", isCompleted);
  // const [isPhoneExist, setIsPhoneExist] = useState<boolean>(false);
  // const mobilephone = useWatch(['mobilephone'], form);
  // const loginid = useWatch(['id'], form);
  const [checkIdMsg, setCheckIdMsg] = useState<any>(undefined);

  const validateSingleMessage = async (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("아이디를 입력해주세요."));
    }
    if (value.length < 6 || value.length > 30) {
      return Promise.reject(new Error("6자 이상 30자 이하로 입력해주세요."));
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9-]+$/.test(value)) {
      return Promise.reject(
        new Error("아이디는 문자와 숫자를 모두 포함해야 합니다.")
      );
    }
    if (errorMsg?.id) {
      return Promise.reject(new Error(errorMsg.id));
    }
    return Promise.resolve();
  };

  const isValidDynamicEmail = (
    values: string | string[] | undefined
  ): boolean => {
    if (!values) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedSpecialChars = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~@.-]+$/;

    const emailList = Array.isArray(values) ? values : [values];

    return (
      emailList.length > 0 &&
      emailList.every(
        (val) =>
          emailRegex.test(val.trim()) && allowedSpecialChars.test(val.trim())
      )
    );
  };

  const handleSubmitForm = async (values: any) => {
    console.log("values:", values);
    try {
      if (values.password !== values.verifyPassword) {
        console.log("Passwords do not match");
        setErrorMsg((prev) => ({
          ...prev,
          verifyPassword: "Passwords do not match",
        }));
        return;
      }

      // const check = await mCheckId.mutateAsync({ id: values.id });
      // if (check?.status === 409) {
      //   setErrorMsg((prev) => ({ ...prev, id: check?.response?.data?.message }));
      //   form.validateFields(['id']);
      //   return;
      // }

      // const mPhoneCheck = await mCheckMobilePhone.mutateAsync({ mobilephone: values.mobilephone });
      // if (mPhoneCheck?.status === 409) {
      //   console.log('hereeee');
      //   setErrorMsg((prev) => ({ ...prev, mobilephone: mPhoneCheck?.response?.data?.message }));
      //   form.validateFields(['mobilephone']);
      //   return;
      // }

      delete values.verifyPassword;

      console.log("emails:", values?.email);
      const personalInfoData = {
        ...values,
        email: Array.isArray(values.email) ? values.email[0] : values.email,
        // CUST_DOCS_1: userData?.terms?.['personal_info_required'] ? 'Y' : 'N',
        // CUST_DOCS_2: userData?.terms?.['unique_id_required'] ? 'Y' : 'N',
        // CUST_DOCS_3: userData?.terms?.['processing_consignment_required'] ? 'Y' : 'N'
      };

      updateUserData({
        personalInfo: { ...personalInfoData },
      });
      const res = await mCreate.mutateAsync(personalInfoData);
      // console.log('res', res);
      if (res?.success) {
    let count = 3;
    showToast({
      content: `You have successfully registered. Redirecting in ${count}...`,
      type: "success",
      duration: 3,
    });

    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        showToast({
          content: `You have successfully registered. Redirecting in ${count}...`,
          type: "success",
          duration: count,
        });
      } else {
        clearInterval(interval);
        router.push("/login");
      }
    }, 1000);
      } else {
        message.error(res.message);
        showToast({
          content: "Registration failed. Please try again.",
          type: "error",
        });
      }
      // setKmcVerified(false);
      // setKmcPhoneNumber(''); //
    } catch (error) {
      console.log("Failed");
      console.error(
        "An error occurred while saving member information:",
        error
      );
      message.error("An error occurred while saving member information");
    }
  };

  const writeRequiredConfigItems: FieldWriteForm[] = [
    {
      key: "email",
      label: "Email",
      name: "email",
      labelBlock: true,
      Component: DynamicEmailForm,
      componentProps: {
        inputStyle: {
          height: "48px",
          padding:
            "var(--spacing-vertical, 8px) var(--spacing-horizontal-lg, 16px)",
        },
        selectStyle: {
          height: "48px",
        },
        maxLength: 30,
      },
      rules: [
        { required: true },
        {
          validator: (rule, value) => dynamicEmailValidator(rule, value),
        },
      ],
      style: { width: "100%" },
    },
    {
      key: "password",
      label: "Password",
      name: "password",
      labelBlock: true,
      Component: InputAlphaNumericOnly.Password,
      style: { width: "100%" },
      componentProps: {
        autoComplete: "new-password",
        type: "password",
        placeholder: "Type your password",
        style: {
          width: "100%",
          height: 48,
        },
        maxLength: 20,
        onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => {
          const pastedText = e.clipboardData.getData("text");
          if (/[^a-zA-Z0-9!@#$%^&*()_\-+=.,]/.test(pastedText)) {
            e.preventDefault();
            form.setFields([
              {
                name: "password",
                errors: [
                  "Password can only contain English letters, numbers, and !@#$%^&*()_+-=.,",
                ],
              },
            ]);
          }
        },
      },
      // formItemProps: {
      //   getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => {
      //     const raw = e?.target?.value || '';
      //     const numbersOnly = raw.replace(/[^0-9]/g, '');
      //     return numbersOnly;
      //   }
      // },
      // rules: [{ required: true, message: '' }, { pattern: /^[0-9]+$/ }]
      formItemProps: {
        getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => {
          const raw = e.target.value;
          const filtered = raw.replace(/[\uAC00-\uD7AF]/g, "");
          return filtered;
        },
      },
      rules: [
        { required: true, message: "비밀번호를 입력해주세요." },
        // {
        //   pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[{\]};:<>|./?,-]).{8,20}$/,
        //   message: '비밀번호는 문자/숫자/특수기호 포함 8~20자 이내로 설정해주세요.'
        // }
      ],
    },
    {
      key: "verifyPassword",
      label: "Verify Password",
      name: "verifyPassword",
      labelBlock: true,
      Component: InputAlphaNumericOnly.Password,
      style: { width: "100%" },
      componentProps: {
        type: "password",
        placeholder: "Verify your password",
        style: {
          maxWidth: "100%",
          height: 48,
        },
        maxLength: 20,
        onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => {
          const pastedText = e.clipboardData.getData("text");
          // Nếu có ký tự không hợp lệ thì ngăn paste và báo lỗi
          if (/[^a-zA-Z0-9!@#$%^&*()_\-+=.,]/.test(pastedText)) {
            e.preventDefault();
            form.setFields([
              {
                name: "password",
                errors: [
                  "Password can only contain English letters, numbers, and !@#$%^&*()_+-=.,",
                ],
              },
            ]);
          }
        },
      },
      // formItemProps: {
      //   getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => {
      //     const raw = e?.target?.value || '';
      //     const numbersOnly = raw.replace(/[^0-9]/g, '');
      //     return numbersOnly;
      //   }
      // },
      // rules: [{ required: true, message: '' }, { pattern: /^[0-9]+$/ }]
      formItemProps: {
        getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => {
          const raw = e.target.value;
          const filtered = raw.replace(/[\uAC00-\uD7AF]/g, "");
          return filtered;
        },
        dependencies: ["password"],
      },
      rules: [
        { required: true, message: "Please enter your password." },
        // {
        //   pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[{\]};:<>|./?,-]).{8,20}$/,
        //   message: '비밀번호는 문자/숫자/특수기호 포함 8~20자 이내로 설정해주세요.'
        // },
        {
          validator: async (_, value) => {
            if (!value || form.getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Passwords do not match"));
          },
        },
      ],
    },
  ];

  return (
    <Flex
      vertical
      style={{
        minHeight: "85vh",
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
          Sign up
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
          onValuesChange={(changedValues) => {
            const key = Object.keys(changedValues)[0];

            if (errorMsg[key]) {
              setErrorMsg((prev) => {
                const newErr = { ...prev };
                delete newErr[key];
                return newErr;
              });
              form.validateFields([key]); // re-validate field
            }

            const missingFields = writeRequiredConfigItems
              .filter((item) =>
                item.rules?.some((r) => typeof r === "object" && r?.required)
              )
              .filter((item) => {
                const value = form.getFieldValue(item.name);

                if (item.name === "email") {
                  return !isValidDynamicEmail(value);
                }

                return (
                  value === undefined ||
                  value === "" ||
                  value === null ||
                  (Array.isArray(value) &&
                    value.length === 1 &&
                    value[0] === "")
                );
              });

            setIsCompleted(missingFields.length === 0);
            if (key === "id") setCheckIdMsg(undefined);
          }}
          onFinish={handleSubmitForm}
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Row
            gutter={[44, 24]}
            align={"top"}
            style={{ width: "100%", paddingBottom: 24 }}
          >
            {writeRequiredConfigItems.map((item, index) => {
              if (item.key !== "id")
                return (
                  <WriteItem
                    key={index}
                    item={item}
                    colProps={{ xs: 24 }}
                    mobileLabel={true}
                  />
                );
              return (
                <Col xs={24} key={index}>
                  <Row style={{ width: "100%" }} gutter={0}>
                    <WriteItem
                      key={index}
                      item={item}
                      colProps={{ xs: 19 }}
                      mobileLabel={true}
                    />
                    <Col xs={5} style={{ paddingLeft: 8, display: "flex" }}>
                      <Button
                        style={{ height: 48, flex: 1 }}
                        variant="outlined"
                        color="secondary"
                        size="middle"
                        onClick={async (e) => {
                          e.preventDefault();
                          // await checkExistId();
                        }}
                      >
                        아이디 중복 확인
                      </Button>
                    </Col>
                  </Row>
                  {!!checkIdMsg && (
                    <div
                      style={{
                        marginLeft: 120,
                        marginTop: 4,
                        color: checkIdMsg?.color || "red",
                      }}
                    >
                      {checkIdMsg?.msg || "error"}
                    </div>
                  )}
                </Col>
              );
            })}
          </Row>

          <Button
            type="primary"
            disabled={!isCompleted}
            style={{
              height: 48,
              borderRadius: 8,
              background: !isCompleted
                ? "#e0e0e0"
                : "var(--primary-fg-color-primary-fg-50, #1890ff)",
              border: "none",
              color: !isCompleted ? "#888" : "var(--white, #ffffff)",
              width: "100%",
            }}
            htmlType="submit"
          >
            Continue
          </Button>
        </Form>

        <Flex style={{ justifyContent: "center", marginTop: 16 }}>
          <Link href="#" style={{ fontWeight: 600, marginLeft: 4 }}>
            <Typography>Back to login</Typography>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
