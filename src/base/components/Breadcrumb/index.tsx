import { Typography } from "antd";
import useDevice from "@/base/hooks/useDevice";
import ChevronRight from "@/base/icons/ChevronRight";

interface Step {
  label: string;
  key: string;
  icon?: (isActive: boolean) => React.ReactNode;
}

interface BreadCrumbProps {
  steps?: Step[];
  activeKey?: string;
}

export default function BreadCrumb({ steps = [], activeKey }: BreadCrumbProps) {
  const { isDesktop, isMobile, isTablet } = useDevice();
  return (
    <div
      style={{
        display: "flex",
        height: isDesktop ? "56px" : isTablet ? 88 : undefined,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: isMobile ? 8 : "20px",
        alignSelf: "stretch",
        borderRadius: "8px",
        background: "var(--base-bg-color-base-bg-5, #F8F9FC)",
        marginTop: 40,
        padding: isMobile ? 20 : undefined,
      }}
    >
      {steps.map((step, index) => {
        const isActive = step.key === activeKey;
        return (
          <div
            key={step.key}
            style={{
              flexDirection: !isDesktop ? "row" : undefined,
              display: !isDesktop ? "flex" : undefined,
              alignItems: !isDesktop ? "center" : undefined,
              gap: isTablet ? "20px" : isMobile ? 8 : undefined,
              textAlign: !isDesktop ? "center" : undefined,
              // border: '1px solid red'
            }}
          >
            <div
              key={index}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexDirection: isDesktop ? "row" : "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "4px",
                  alignItems: "center",
                  gap: "10px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "9999px",
                  background: isActive
                    ? "var(--primary-bg-color-primary-bg-60, #692AFA)"
                    : "var(--base-bg-color-base-bg-0, #FFF)",
                  justifyContent: "center",
                }}
              >
                {step.icon ? step.icon(isActive) : null}
              </div>
              <Typography
                className="title-xs"
                style={{
                  height: isTablet ? "20px" : undefined,
                  fontWeight: isActive ? "bold" : "normal",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: isMobile ? 11 : undefined,
                  // whiteSpace: 'pretty'
                }}
              >
                {step.label}
              </Typography>
              {isDesktop
                ? index < steps.length - 1 && (
                    <ChevronRight style={{ color: "#646E8B" }} />
                  )
                : null}
            </div>
            {isDesktop
              ? null
              : index < steps.length - 1 && (
                  <ChevronRight style={{ color: "#646E8B" }} />
                )}
          </div>
        );
      })}
    </div>
  );
}
