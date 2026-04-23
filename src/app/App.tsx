import { useState } from "react";
import Component1020X300LM from "../imports/1020X300LM/1020X300LM";

const MAX_LENGTH = {
  line1: 20,
  line2: 12,
} as const;

export default function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const isText1Over = text1.length > MAX_LENGTH.line1;
  const isText2Over = text2.length > MAX_LENGTH.line2;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[800px] mx-auto">
        <h1 className="mb-8">네이버 스페셜DA 750x520 광고 글자수 확인</h1>

        {/* 입력 영역 */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-4">

            {/* 가이드 */}
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h3 className="mb-2">우리의 아름다운 하루를 위해..</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>1행 문구: 최대 {MAX_LENGTH.line1}자</li>
                <li>2행 문구: 최대 {MAX_LENGTH.line2}자</li>
              </ul>
            </div>


            {/* 1행 입력 */}
            <div>
              <label className="block mb-2 font-medium">
                1행 문구 ({text1.length}/{MAX_LENGTH.line1}자)
                {isText1Over && (
                  <span className="text-red-600 ml-2">⚠ 글자수 초과</span>
                )}
              </label>
              <input
                type="text"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`문구를 입력하세요 (최대 ${MAX_LENGTH.line1}자)`}
              />
            </div>

            {/* 2행 입력 */}
            <div>
              <label className="block mb-2 font-medium">
                2행 문구 ({text2.length}/{MAX_LENGTH.line2}자)
                {isText2Over && (
                  <span className="text-red-600 ml-2">⚠ 글자수 초과</span>
                )}
              </label>
              <input
                type="text"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`문구를 입력하세요 (최대 ${MAX_LENGTH.line2}자)`}
              />
            </div>
          </div>
        </div>

        {/* 미리보기 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="mb-4">미리보기 (1020x300 · 0.5배율)</h2>
          {/* 외부 div: 축소된 실제 크기로 공간 확보 */}
          <div style={{ width: 510, height: 150, overflow: "hidden" }}>
            {/* 내부 div: 원본 크기 유지 후 scale 축소 */}
            <div style={{ transform: "scale(0.5)", transformOrigin: "top left", width: 1020, height: 300 }}>
              <Component1020X300LM text1={text1} text2={text2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}