import imgAdmark from "./admark.png";

// ─── 공통 폰트 클래스 ───────────────────────────────────────────
const FONT_BASE = "font-['Pretendard_Variable',sans-serif] not-italic";

// ─── 텍스트 박스 정의 ───────────────────────────────────────────
// txt1: top=36, h=50
const TXT1 = {
  container: "absolute h-[56px] left-[48px] top-[36px] w-[924px]",
  text: `absolute flex flex-col ${FONT_BASE} inset-0 justify-center    translate-y-[-10px]    overflow-hidden text-[#222] text-[54px] text-ellipsis tracking-[-1.62px] whitespace-nowrap`,
  default: "일이삼사오륙칠팔구십일이삼사오륙칠팔구십",
};

// txt2: top=112, h=50 (admark와 flex 묶음으로 같이 사용)
const TXT2 = {
  text: `absolute flex flex-col ${FONT_BASE} font-bold inset-0 justify-center    translate-y-[-5px]     overflow-hidden text-black text-[54px] text-ellipsis tracking-[-2.16px] whitespace-nowrap`,
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

// ─── 텍스트 영역 가이드 (영역 확인용) ──────────────────────────────
function Txt1Area({ className }: { className?: string }) {
  return (
    <div
      className={className || "absolute h-[50px] left-[48px] top-[34px] w-[924px]"}
      data-name="txt1_area"
    >
      <div className="absolute bg-[#0fe] inset-0 opacity-30" data-name="txt1_area" />
    </div>
  );
}

function Txt2Area({ className }: { className?: string }) {
  return (
    <div
      className={className || "absolute h-[50px] left-[48px] top-[111px] w-[538px]"}
      data-name="txt2_area"
    >
      <div className="absolute bg-[#0fe] inset-0 opacity-30" data-name="txt2_area" />
    </div>
  );
}

// ─── 메인 컴포넌트 ───────────────────────────────────────────────
export default function Component1020X300LM({ text1, text2 }: { text1?: string; text2?: string }) {
  return (
    <div className="relative size-full" data-name="1020x300_LM">
      {/* 배경 */}
      <div className="absolute bg-[#eaeef3] h-[300px] left-0 top-0 w-[1020px]" data-name="bg" />

      {/* 안전 영역 마진 */}
      <SafeAreaMargin />

      {/* 텍스트 영역 가이드 */}
      <Txt1Area />
      <Txt2Area />

      {/* 1행 문구 */}
      <div className={TXT1.container} data-name="txt1">
        <div className={TXT1.text}>
          <p className="leading-[normal]  overflow-hidden text-ellipsis">
            {text1 || TXT1.default}
          </p>
        </div>
      </div>

      {/*
        2행 문구 + 광고마크 묶음
        - flex + items-center 로 수직 중앙 정렬 보장
        - txt2 left=49, w=538 / gap=18 / admark w=75 → 총 width=631
        - top=112, h=50 (txt1 행과 동일 높이 기준)
      */}
      <div
        className="absolute left-[49px] top-[112px] h-[56px] w-[631px] flex items-center"
        data-name="row2"
      >
        {/* txt2: relative로 내부 absolute 자식 기준점 제공 */}
        <div className="relative h-full w-[538px] shrink-0" data-name="txt2">
          <div className={TXT2.text}>
            <p className="leading-[normal]  overflow-hidden text-ellipsis">
              {text2 || TXT2.default}
            </p>
          </div>
        </div>

        {/* txt2 ~ 광고마크 간격 (18px) */}
        <div className="w-[18px] shrink-0" />

        {/* 광고마크: items-center로 txt2와 수직 중앙 자동 정렬 */}
        <div className="w-[75px] h-[50px] shrink-0 overflow-hidden" data-name="admark">
          <img
            alt="광고 표시"
            className="w-full h-full object-cover pointer-events-none"
            src={imgAdmark}
          />
        </div>
      </div>

      {/* 로고 영역 */}
      <div className="absolute bg-[red] h-[50px] left-[48px] top-[208px] w-[400px]" data-name="logo" />
    </div>
  );
}