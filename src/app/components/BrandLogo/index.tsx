import useDevice from "@/base/hooks/useDevice";
import ArtallLogoIcon from "@/base/icons/BrandLogo";
import { Flex } from "antd";
import Typography from "antd/es/typography/Typography";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";

interface BrandLogoProps {
  textColor?: "textPrimary" | "textMain";
  style?: CSSProperties;
}

const BrandLogo = (props: BrandLogoProps) => {
  const router = useRouter();
  const handleBackHome = () => {
    router.push("/");
  };
  return (
    <div
      onClick={handleBackHome}
      style={{
        cursor: "pointer",
        userSelect: "none",
        flexWrap: "inherit",
        alignItems: "center",
        gap: 8,
        display: "flex",
      }}
    >
      <ArtallLogoIcon width={140} fill="var(--black, #101010)" />
    </div>
  );
};

export default BrandLogo;
