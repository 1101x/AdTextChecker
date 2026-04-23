import { useState } from "react";
import Component1020X300LM from "../imports/1020X300LM/1020X300LM";

export default function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[800px] mx-auto">
        <h1 className="mb-8">네이버 스페셜DA 750x520 광고 문구 확인</h1>

        {/* 입력 영역 */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-4">

            {/* 가이드 */}
            <div className="mt-3 p-4 bg-gray-50 rounded">
              <ul className="text-sm text-gray-600 space-y-1">
                <li><b>광고 메시지 문구 내 문장 부호 사용 범위</b></li>
                <li>- 텍스트 문구 내 문장 부호는 최대 2개까지 사용 가능합니다.</li>
                <li>- 사용 가능 문자 : 마침표 (.) 쉼표 (,) 느낌표 (!) 물음표 (?) 붙임표 (-) 더하기 (+) and (&) 빗금 (/) 따옴표 (" ') 쌍점 (:) 물결(~)</li>
                <li>- 물결(~)은 범위 표시(예 : ~70, 1~70, 70~)를 위한 사용 용도로만 허용하며, 물결(~)을 제외한 문장 부호는 2개 연속 사용이 불가합니다.</li>
                <li>- 특수 문자는 의미 전달을 위한 목적으로 사용이 꼭 필요한 경우에만 협의 후 사용 가능합니다</li>
                <li>- 문장 내 복수 항목 표기 등을 위해 불가피하게 3개 이상 필요한 경우, 협의 후 사용 가능합니다. (예 : 입원, 암진단, 수술, 항암까지)</li>
              </ul>
            </div>

            {/* 1행 입력 */}
            <div>
              <label className="block mb-2 font-medium">
                1행 문구
              </label>
              <input
                type="text"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1행 문구를 입력하세요"
              />
            </div>

            {/* 2행 입력 */}
            <div>
              <label className="block mb-2 font-medium">
                2행 문구
              </label>
              <input
                type="text"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2행 문구를 입력하세요"
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