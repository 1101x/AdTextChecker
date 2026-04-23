import { useState, useRef, useId } from "react";
import { toPng } from "html-to-image";
import { CircleX } from "lucide-react";
import Component1020X300LM from "../imports/1020X300LM/1020X300LM";

// ─── 유틸리티 함수 ──────────────────────────────────────────────
/**
 * YYYYMMDD_HHMMSS 형식의 타임스탬프를 생성합니다.
 */
const getFormattedTimestamp = () => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    now.getFullYear() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    "_" +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
};

// ─── 공통 입력 컴포넌트 ───────────────────────────────────────────
interface AdInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

const AdInput = ({ label, value, onChange, placeholder }: AdInputProps) => {
  const inputId = useId();
  return (
    <div>
      <label htmlFor={inputId} className="block mb-2 font-bold text-gray-700 text-sm">
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};

// ─── 가이드 데이터 ──────────────────────────────────────────────
const GUIDE_LIST = [
  "텍스트 문구 내 문장 부호는 최대 2개까지 사용 가능합니다.",
  "사용 가능 문자 : . , ! ? - + & / \" ' : ~",
  "물결(~)은 범위 표시용으로만 허용하며, 연속 사용은 불가합니다.",
  "특수 문자는 의미 전달 목적으로 꼭 필요한 경우에만 협의 후 사용 가능합니다.",
  "문장 내 복수 항목 표기 등으로 3개 이상 필요한 경우 협의 후 사용 가능합니다.",
];

export default function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (!previewRef.current) return;
    try {
      setIsExporting(true);
      await new Promise((resolve) => setTimeout(resolve, 200));

      const dataUrl = await toPng(previewRef.current, {
        backgroundColor: "transparent",
        width: 1020,
        height: 300,
        style: { transform: "scale(1)", transformOrigin: "top left" },
      });

      const link = document.createElement("a");
      link.download = `${getFormattedTimestamp()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("이미지 저장 중 오류가 발생했습니다.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 font-['NanumBarunGothic'] text-gray-900">
      <div className="max-w-[800px] mx-auto">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">
            광고 글자수 확인 : 네이버 스페셜DA 750x520 {isDarkMode ? "DM" : "LM"}
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded font-bold text-sm transition-colors ${isDarkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
              }`}
          >
            {isDarkMode ? "라이트모드로 전환" : "다크모드로 전환"}
          </button>
        </header>

        {/* 설정 영역 */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
          {/* 가이드 박스 */}
          <article className="p-4 bg-gray-50 rounded border border-gray-200">
            <h2 className="text-sm font-bold mb-2 text-gray-700">광고 메시지 문구 내 문장 부호 사용 범위 (ver.2026.03)</h2>
            <ul className="text-xs text-gray-600 space-y-1">
              {GUIDE_LIST.map((text, idx) => (
                <li key={idx}>- {text}</li>
              ))}
            </ul>
          </article>

          {/* 입력 폼 */}
          <div className="space-y-4">
            <AdInput label="1행 문구" value={text1} onChange={setText1} placeholder="1행 문구를 입력하세요" />
            <AdInput label="2행 문구" value={text2} onChange={setText2} placeholder="2행 문구를 입력하세요" />

            {/* 로고 업로드 */}
            <div className="flex items-center gap-3 pt-2">
              <label className="sr-only">로고 이미지 업로드</label>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white text-sm font-bold rounded transition-colors"
              >
                로고 업로드
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              {logoImage && (
                <button
                  onClick={() => setLogoImage(null)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="로고 삭제"
                  title="로고 삭제"
                >
                  <CircleX size={20} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 미리보기 섹션 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">미리보기 (1020x300)</h2>
            <button
              onClick={handleSaveImage}
              disabled={isExporting}
              className="min-w-[210px] px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded transition-colors shadow-sm"
            >
              {isExporting ? "이미지 생성 중..." : "이미지로 저장 (투명 PNG)"}
            </button>
          </div>

          <div className="flex justify-center bg-gray-100 p-4 md:p-8 rounded-lg border border-dashed border-gray-300 overflow-hidden">
            <div style={{ width: 510, height: 150 }}>
              <div
                ref={previewRef}
                style={{
                  transform: "scale(0.5)",
                  transformOrigin: "top left",
                  width: 1020,
                  height: 300,
                  backgroundColor: isExporting ? 'transparent' : 'white'
                }}
              >
                <Component1020X300LM
                  text1={text1}
                  text2={text2}
                  logoImage={logoImage}
                  isExporting={isExporting}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}