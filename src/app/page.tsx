"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');  // コピー成功メッセージ用の状態

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("spapi_oauth_code")) {
      setIsActive(true);
    }
  }, []);

  const handleButtonClick = async () => {
    const url = new URL(window.location.href);
    const spapi_oauth_code = url.searchParams.get("spapi_oauth_code");

    // クリップボードにspapi_oauth_codeをコピー
    if (navigator.clipboard && spapi_oauth_code) {  // navigator.clipboardが利用可能でspapi_oauth_codeが存在する場合
      try {
        await navigator.clipboard.writeText(spapi_oauth_code);
        setCopySuccess("コピーしました!!");
      } catch (err) {
        setCopySuccess("コピーに失敗しました。");
      }
    } else {
      setCopySuccess("クリップボードにアクセスできません。");
    }
  };

  return (
    <div>
      <h1>Amazon DST SP-API Authorization Page</h1>
      <Link href="https://sellercentral.amazon.co.jp/apps/authorize/consent?application_id=amzn1.sp.solution.4f4d0d53-3b9a-4158-88ec-c2118bafc164" legacyBehavior>
        <a target="_blank">Amazon SP-API アクセス権限設定</a>
      </Link>
      <br />
      <button onClick={handleButtonClick} disabled={!isActive}>
        Amazon連携コードをコピー
      </button>
      {copySuccess && <p>{copySuccess}</p>}
    </div>
  );
}
