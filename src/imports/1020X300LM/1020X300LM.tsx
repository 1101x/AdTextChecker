import imgAdmark from "./admark.png";
import imgAdmarkDM from "./admark_dm.png";

// ─── 공통 폰트 클래스 ───────────────────────────────────────────
const FONT_BASE = "font-['NanumBarunGothic',sans-serif] not-italic";

// ─── 텍스트 박스 스타일 ───────────────────────────────────────────
const TXT1 = {
  container: "absolute h-auto left-[48px] top-[36px] w-[924px]",
  text: (isDarkMode: boolean) => `relative flex flex-col ${FONT_BASE} translate-y-[-12px] overflow-hidden ${isDarkMode ? "text-[#dadde0]" : "text-[#222]"} text-[54px] text-ellipsis tracking-[-1.5px] whitespace-nowrap`,
  default: "일이삼사오륙칠팔구십일이삼사오륙칠팔구십",
};

const TXT2 = {
  // 사용자가 입력했을 때는 w-auto, 아니면 디폴트 538px 유지
  container: (hasInput: boolean) => `relative h-auto ${hasInput ? 'w-auto max-w-[538px]' : 'w-[538px]'} shrink-0`,
  text: (isDarkMode: boolean) => `relative flex flex-col ${FONT_BASE} font-bold translate-y-[-12px] overflow-hidden ${isDarkMode ? "text-[#fefefe]" : "text-black"} text-[54px] text-ellipsis tracking-[-2px] whitespace-nowrap`,
  default: "일이삼사오륙칠팔구십일이",
};

// ─── 안전 영역 마진 오버레이 ─────────────────────────────────────
function SafeAreaMargin() {
  return (
    <div className="absolute contents left-0 top-0" data-name="margin">
      <div className="absolute bg-[rgba(255,0,0,0.4)] h-[34px] left-0 top-0 w-[1020px]" />
      <div className="absolute bg-[rgba(255,0,0,0.4)] h-[300px] left-0 top-0 w-[48px]" />
      <div className="absolute bg-[rgba(255,0,0,0.4)] h-[300px] right-0 top-0 w-[48px]" />
    </div>
  );
}

// ─── 텍스트 영역 가이드 ──────────────────────────────
function TxtArea({ top, left, width, height }: { top: number, left: number, width: number, height: number }) {
  return (
    <div
      style={{ top, left, width, height }}
      className="absolute"
    >
      <div className="absolute bg-[#0fe] inset-0 opacity-30" />
    </div>
  );
}

interface Props {
  text1?: string;
  text2?: string;
  logoImage?: string | null;
  isExporting?: boolean;
  isDarkMode?: boolean;
}

export default function Component1020X300LM({ text1, text2, logoImage, isExporting = false, isDarkMode = false }: Props) {
  const hasText2 = text2 && text2.trim().length > 0;
  const bgColor = isDarkMode ? "#303033" : "#eaeef3";

  return (
    <div
      className="relative"
      style={{ width: 1020, height: 300, backgroundColor: isExporting ? 'transparent' : bgColor }}
      data-name="1020x300_LM"
    >
      {/* 배경 레이어 (저장 시 숨김) */}
      {!isExporting && (
        <>
          <div className="absolute h-[300px] left-0 top-0 w-[1020px]" style={{ backgroundColor: bgColor }} data-name="bg" />
          <SafeAreaMargin />
          <TxtArea top={34} left={48} width={924} height={50} />
          <TxtArea top={111} left={48} width={538} height={50} />
          {/* 가이드용 로고 박스 표시 (초록색 투명도 50%) */}
          <div className="absolute bg-green-500/50 h-[50px] left-[48px] top-[208px] w-[400px]" data-name="logo_guide" />
        </>
      )}

      {/* 1행 문구 */}
      <div className={TXT1.container} data-name="txt1">
        <div className={TXT1.text(isDarkMode)}>
          <p className="overflow-hidden text-ellipsis">
            {text1 || TXT1.default}
          </p>
        </div>
      </div>

      {/* 2행 문구 + 광고 마크 그룹 (Flex) */}
      <div
        className="absolute left-[48px] top-[111px] flex items-start gap-[18px]"
        data-name="row2-group"
      >
        {/* 2행 문구: 입력값에 따라 너비 유동적 */}
        <div className={TXT2.container(!!hasText2)} data-name="txt2">
          <div className={TXT2.text(isDarkMode)}>
            <p className="overflow-hidden text-ellipsis">
              {text2 || TXT2.default}
            </p>
          </div>
        </div>

        {/* 광고 마크: txt2 바로 옆 18px 유지 */}
        <div
          className="w-[75px] h-[50px] shrink-0 overflow-hidden"
          data-name="admark"
        >
          <img
            alt="광고 표시"
            className="w-full h-full object-contain pointer-events-none"
            src={isDarkMode ? imgAdmarkDM : imgAdmark}
          />
        </div>
      </div>

      {/* 로고 이미지 (업로드 시 표시) */}
      {logoImage && (
        <div
          className="absolute h-[50px] left-[48px] top-[208px] w-[400px]"
          data-name="logo_image"
        >
          <img
            src={logoImage}
            alt="업로드 로고"
            className="h-full w-auto object-contain object-left pointer-events-none"
          />
        </div>
      )}
    </div>
  );
}