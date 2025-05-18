export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Define videoLinks array here (copied from js/script.js)
    const videoLinks = [
      { link: "https://www.youtube.com/embed/B79hw1wCoS0", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/MH1YnfTBF6I", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/hk7BTKrno0k", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/gvdweIU9m3c", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/JZ3faitUC2Q", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/nL7X9SIAobE", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/9vxfjvEUW7o", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/8604H206UyA", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/w_RTZjaMcxk", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/9o5Vjnm--YE", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/ZTYelONAofo", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/X0oOGzNN-oc", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/5ArRe0CKkbo", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/iw_dGyd3ZVo", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/x6HeUojc8OA", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/zDx6lBZSwG0", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/-Jo_v4kkYQA", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/Ivp5MWRgyuA", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/5_wOpRsc1tk", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/2SyxfBHgGJQ", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/oeoF_gqheHE", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/kQRrHBP-veo", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/qcio5lZXXL8", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/OHz4bg2IV_8", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/xtbva7378mk", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/dYkxdNXdmhU", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/BM9ctZcl758", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/vkoBgA5OT50", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/sRVYXzejenc", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/2_syHedgZGI", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/tvCtPuxuE90", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/436S1Obe7qQ", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/AgOj9GDoI5Q", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/n-zsfJtEpmM", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/0T7B9PjxBJI", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/Bd_rf3Vev0w", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/UIs5rvLqBXI", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/BLoEXkfWDgI", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/ShOdTN0tDm4", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/0AXVCmfWtuE", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/sXZnxoWWPxI", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/mA98NO-AiQA", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/SWzwJfpey34", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/dHyq-PiGeJQ", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/orSXtoUKVKo", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/attachments", trueRank: "Diamond" }, // Note: "attachments" might be a placeholder or error
      { link: "https://www.youtube.com/embed/QJwzaKrJK3w", trueRank: "Gold" },
      { link: "https://www.youtube.com/embed/O8Ve9b2TjYM", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/nB-_mrAFMqU", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/xh_mCSahmHQ", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/7EvMCC1AaJI", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/XDSRRgop7Ck", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/7eEVqPa5rXQ", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/yGwzCN1P0SI", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/hyEI30VzoE4", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/AjLK0D2U5yw", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/VbybAv97zl4", trueRank: "Gold" },
      { link: "https://www.youtube.com/embed/oFmhq-RFMDg", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/tMVv4xepwOM", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/WTor8aq6EUs", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/guest-login", trueRank: "Legendary" }, // Note: "guest-login" might be a placeholder or error
      { link: "https://www.youtube.com/embed/LCWislFwdw0", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/Tz8OSB_8Kkc", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/sRK5yKvduXw", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/Hx12w1DlWEE", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/AH0aCSX2Z0Y", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/E5Ixj-Nl9fg", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/8wQDwAW7v6E", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/MkO0PU0iMD4", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/m8zJRLVOLbs", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/C-5TcH8vh8U", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/-HRZ_0x35d4", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/UEMLZ_2Vs1g", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/CXxg4B3wCDc", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/UzlUp_T_048", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/_KXxTGwEydA", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/nRSjsMQNOus", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/U9YvpRO0wcA", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/1prdzrHmTAa", trueRank: "Gold" },
      { link: "https://www.youtube.com/embed/25INMcWVZLI", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/1ZxSxc5eSfk", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/EeOyEOhkNBc", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/AOUYD6Tu-us", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/qc2hzIXF28M", trueRank: "Silver" },
      { link: "https://www.youtube.com/embed/-1EsK0iNE_8", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/OHNIK5hY884", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/Uq37V_N7VB8", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/WaKFkDs6uUc", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/Qwhs0bA-bhw", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/Diikb5VTVz0", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/8ODyf91sgqE", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/qvdgMBFnpPw", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/J4Cu2B4JybY", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/LTYgmxyHcZg", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/Ay2dS6kshWA", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/XqDCeLydkhI", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/62_d3v5YNx0", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/3MA9uzJVvGI", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/C0_OqjSocvA", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/yaFfh3DZZtE", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/IbLjFyxVRWo", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/mTc3O1smvRU", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/--8Ph4IB46Q", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/d3zpHzyF6d0", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/Ff5P6XanTQk", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/CUrbZ0Gny34", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/zTLw9wFIlF0", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/7ZH9DXWgIZA", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/vyHfRwVceqo", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/2obdN4JsOYk", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/jz3gFnsqrqM", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/vEtQfLdpXMg", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/QLSfXF_Qt-8", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/PYiubkEhf1I", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/cj1XmlDxnDs", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/QKCwEU8yI88", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/0i9gbTQrDN8", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/XTUnnIN0KG4", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/Mnn0g-orGHc", trueRank: "Gold" },
      { link: "https://www.youtube.com/embed/LTAQqRrSh94", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/j27YKvLKlXI", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/Dha7t8gnYe4", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/d69r2XjHe94", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/Rl6JiWFd5Z8", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/LQyU9QCH-vE", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/lZRrKYtmrZ0", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/aU-8mt4t08E", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/u_4qGc4TwIs", trueRank: "Silver" },
      { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/LmLFWlHCPko", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/oJtsKjF78DQ", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/Ye5DTeuOknc", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/Xe3AuIcudVg", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/fc_7Deq4oyw", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/iN5Pm6RCuU0", trueRank: "Gold" },
      { link: "https://www.youtube.com/embed/I3MUY-cZZwc", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/Fjt46na_LGA", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/n-b_k0Nycaw", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/MqhIpLk58tE", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/Z8eCP859K9s", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/N0rr7BxAap4", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/NG61SAV-_CY", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/UrElWiG6weQ", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/_T0kQJnjtn4", trueRank: "Gold" },
      { link: "https://www.youtube.com/embed/mrLl2hsDKE0", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/z8idXBnsKkM", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/pBY5p_wNSU4", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/XT4MkBLlAog", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/xJV38Had9uA", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/1P1V26UP114", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/N8RTl28QCYw", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/nJjNkNX6bdk", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/xmgYR12sIJ4", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/8CBCAtUMZPc", trueRank: "Gold" },
      { link: "https://www.youtube.com/embed/cMb2SHQU3Mo", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/KSZOiAqpGe4", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/IeqpEe1LFUE", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/6No_evYamko", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/OD1naIVT1Aw", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/F5LTyXmrGaQ", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/dTc2dvysCxM", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/rFPvDFkKUbs", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/oBMeZJx_hjs", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/GxlG74B6rwo", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/X4KDe0NXr_4", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/WsgqqmCguAQ", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/XCjtseC0Lsc", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/2Gn4-BllRc8", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/b-SWjZmz_aE", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/v1TerH0rqGU", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/fBhCJhpO1Dw", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/qCC3nGOTIiE", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/AwnpLM63pH8", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/Ayj-yzgMnlA", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/mLx83oQLRoc", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/_U-MF4PUd7c", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/ersaWEt4Vuc", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/8-eT1MTELpc", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/ksHuXONEtuI", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/4MD8nuX39es", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/8AxzOwwxNsI", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/LViQBR_CiCw", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/HLWHpHkWuy8", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/2jTkzaf1ymw", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/IJOcgZej8Nc", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/eikRuhoft_0", trueRank: "Gold" },
      { link: "https://www.youtube.com/embed/Vb9WeKROv40", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/OXnmtUPUitQ", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/0uOLwzlG3-Y", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/ryQI9JEcLGc", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/Pmr7xdeWxsM", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/AFXSw1lRRco", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/ODjO2bn-bvU", trueRank: "Silver" },
      { link: "https://www.youtube.com/embed/RPepxKvmLgw", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/KlNSyZYj4hk", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/kkmknDH18f8", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/uKGPNwsqyZA", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/OyM9xeZTfx4", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/Q3sOpnXO8iQ", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/djFFOWeYwTQ", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/X4l6wFtgLQc", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/eFfvP8-XjVg", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/m7jhi4uj-no", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/J2xif3YXB1c", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/OVOYLgQfsc4", trueRank: "Gold" },
      { link: "https://www.youtube.com/embed/Cbqk2EsjHgU", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/k02c08f1tDc", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/Qx_zDRVVUvQ", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/RW9jdSiYq1g", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/py3hoX29pBc", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/rI3IJBxpQuU", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/ae0HzlL-GL8", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/8Ym9P_1h4OQ", trueRank: "Gold" },
      { link: "https://www.youtube.com/embed/v3rfOVCx_Bk", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/j_WLSHgvPMI", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/Cb68u2DcS-M", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/5rNmNOCimzo", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/3CTb92Va_I8", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/NkqQZyVYJzE", trueRank: "Diamond" },
      { link: "https://www.youtube.com/embed/Zf4yyFfLJGw", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/dhvyuz8KKZw", trueRank: "Bronze" },
      { link: "https://www.youtube.com/embed/4Z77VhLQ2II", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/oj9bpzrmEP8", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/VAd_w1N5ctI", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/-Bvw2pZEsok", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/QUqzbZnFYa0", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/HXuFDFntEBY", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/YQ2qYuL7Yik", trueRank: "Gold" },
      { link: "https://www.youtube.com/embed/8rPrsHypK1E", trueRank: "Mythic" },
      { link: "https://www.youtube.com/embed/fOzL2M-Rs1M", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/ZKkrBi6fbDw", trueRank: "Gold" },
      { link: "https://www.youtube.com/embed/lslQSk5M2cI", trueRank: "Legendary" },
      { link: "https://www.youtube.com/embed/awUls0cfWpE", trueRank: "Masters" },
      { link: "https://www.youtube.com/embed/qstQ7XxNvwY", trueRank: "Masters" },
    ];
    
    function getRandomVideos(count) {
      const shuffled = videoLinks.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count).map(video => video.link);
    }

    const url = new URL(request.url);
    if (url.pathname === "/matchmaking/join" && request.method === "POST") {
      try {
        const { player } = await request.json();
        
        // Ensure the table exists with the latest schema
        await env.MATCHMAKING.prepare(`CREATE TABLE IF NOT EXISTS matchmaking (
          lobby_id INTEGER PRIMARY KEY AUTOINCREMENT,
          player_one TEXT,
          player_two TEXT,
          clip1_p1_guess TEXT, clip1_p2_guess TEXT,
          clip2_p1_guess TEXT, clip2_p2_guess TEXT,
          clip3_p1_guess TEXT, clip3_p2_guess TEXT,
          clip4_p1_guess TEXT, clip4_p2_guess TEXT,
          clip5_p1_guess TEXT, clip5_p2_guess TEXT,
          winner TEXT,
          expired BOOLEAN DEFAULT FALSE,
          current_clip_number INTEGER DEFAULT 1,
          video_for_clip1 TEXT,
          video_for_clip2 TEXT,
          video_for_clip3 TEXT,
          video_for_clip4 TEXT,
          video_for_clip5 TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`).run();

        // Attempt to add new columns to an existing table if they are missing
        const columnsToAdd = [
          { name: "clip1_p1_guess", type: "TEXT" }, { name: "clip1_p2_guess", type: "TEXT" },
          { name: "clip2_p1_guess", type: "TEXT" }, { name: "clip2_p2_guess", type: "TEXT" },
          { name: "clip3_p1_guess", type: "TEXT" }, { name: "clip3_p2_guess", type: "TEXT" },
          { name: "clip4_p1_guess", type: "TEXT" }, { name: "clip4_p2_guess", type: "TEXT" },
          { name: "clip5_p1_guess", type: "TEXT" }, { name: "clip5_p2_guess", type: "TEXT" },
          { name: "expired", type: "BOOLEAN DEFAULT FALSE" },
          { name: "current_clip_number", type: "INTEGER DEFAULT 1" },
          { name: "video_for_clip1", type: "TEXT" },
          { name: "video_for_clip2", type: "TEXT" },
          { name: "video_for_clip3", type: "TEXT" },
          { name: "video_for_clip4", type: "TEXT" },
          { name: "video_for_clip5", type: "TEXT" },
          { name: "created_at", type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP" },
          { name: "last_updated_at", type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP" }
        ];

        for (const col of columnsToAdd) {
          try {
            await env.MATCHMAKING.prepare(`ALTER TABLE matchmaking ADD COLUMN ${col.name} ${col.type}`).run();
            console.log(`WORKER: Successfully added column ${col.name}.`);
          } catch (e) {
            if (e.message && (e.message.includes("duplicate column name") || e.message.includes("already exists"))) {
              console.log(`WORKER: Column ${col.name} already exists.`);
            } else {
              console.warn(`WORKER: Could not add column ${col.name}: ${e.message}. This might be okay if it was added in a previous partial migration.`);
              // Decide if this should be a critical error. For dev, might be okay to continue.
            }
          }
        }

        const existing = await env.MATCHMAKING.prepare(
          "SELECT lobby_id FROM matchmaking WHERE player_two IS NULL AND player_one != ? AND (expired IS NULL OR expired = FALSE) ORDER BY lobby_id LIMIT 1"
        ).bind(player).first();

        if (existing) {
          const lobbyId = existing.lobby_id;
          await env.MATCHMAKING.prepare(
            "UPDATE matchmaking SET player_two = ?, last_updated_at = CURRENT_TIMESTAMP WHERE lobby_id = ?"
          ).bind(player, lobbyId).run();
          return new Response(JSON.stringify({ lobby_id: lobbyId, status: "ready" }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
        } else {
          // New lobby: select 5 random videos
          const selectedVideos = getRandomVideos(5);
          
          const insertResult = await env.MATCHMAKING.prepare(
            "INSERT INTO matchmaking (player_one, video_for_clip1, video_for_clip2, video_for_clip3, video_for_clip4, video_for_clip5) VALUES (?, ?, ?, ?, ?, ?)"
          ).bind(player, ...selectedVideos).run();
          
          console.log("WORKER: Insert operation result (new lobby with videos):", JSON.stringify(insertResult));

          const newLobby = await env.MATCHMAKING.prepare(
            "SELECT lobby_id FROM matchmaking WHERE player_one = ? AND player_two IS NULL AND (expired IS NULL OR expired = FALSE) ORDER BY lobby_id DESC LIMIT 1"
          ).bind(player).first();

          console.log("WORKER: Fetched newLobby after insert:", JSON.stringify(newLobby));

          if (!newLobby || newLobby.lobby_id === null || newLobby.lobby_id === undefined) {
            console.error("WORKER: CRITICAL - Could not retrieve lobby_id via SELECT after INSERT. Player:", player, "InsertResult:", JSON.stringify(insertResult));
            return new Response(JSON.stringify({ error: "Failed to create lobby and retrieve its ID.", details: "Could not confirm lobby creation after insert." }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
          }
          
          const lobbyId = newLobby.lobby_id;
          console.log("WORKER: Retrieved lobbyId via SELECT query:", lobbyId);

          return new Response(JSON.stringify({ lobby_id: lobbyId, status: "waiting" }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
        }
      } catch (e) {
        console.error(`WORKER ERROR (/matchmaking/join): ${e.message}`, e.stack);
        return new Response(JSON.stringify({ error: "Internal worker error during join.", details: e.message }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
      }
    }

    if (url.pathname === "/matchmaking/status" && request.method === "GET") {
      try {
        const lobby_id = url.searchParams.get("lobby_id");
        const row = await env.MATCHMAKING.prepare(
          "SELECT player_one, player_two, current_clip_number, video_for_clip1, video_for_clip2, video_for_clip3, video_for_clip4, video_for_clip5, clip1_p1_guess, clip1_p2_guess, clip2_p1_guess, clip2_p2_guess, clip3_p1_guess, clip3_p2_guess, clip4_p1_guess, clip4_p2_guess, clip5_p1_guess, clip5_p2_guess, winner, expired FROM matchmaking WHERE lobby_id = ?"
        ).bind(lobby_id).first();

        if (!row) {
          return new Response(JSON.stringify({ error: "Lobby not found" }), { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } });
        }

        // Determine status based on players and guesses
        let game_status = "waiting"; // Default
        if (row.player_one && row.player_two) {
          game_status = "ready"; // Both players joined, game is ready to start or in progress
          // Client will use current_clip_number and guess fields to manage progression
        } else if (row.player_one) {
          game_status = "waiting_for_player_two";
        }

        return new Response(JSON.stringify({ 
            lobby_id, 
            status: game_status, 
            player_one: row.player_one, 
            player_two: row.player_two,
            current_clip_number: row.current_clip_number,
            videos: [row.video_for_clip1, row.video_for_clip2, row.video_for_clip3, row.video_for_clip4, row.video_for_clip5],
            guesses: {
              clip1: { p1: row.clip1_p1_guess, p2: row.clip1_p2_guess },
              clip2: { p1: row.clip2_p1_guess, p2: row.clip2_p2_guess },
              clip3: { p1: row.clip3_p1_guess, p2: row.clip3_p2_guess },
              clip4: { p1: row.clip4_p1_guess, p2: row.clip4_p2_guess },
              clip5: { p1: row.clip5_p1_guess, p2: row.clip5_p2_guess }
            },
            winner: row.winner,
            expired: row.expired
          }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
      } catch (e) {
        console.error(`WORKER ERROR (/matchmaking/status): ${e.message}`, e.stack);
        return new Response(JSON.stringify({ error: "Internal worker error during status check.", details: e.message }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
      }
    }
    if (url.pathname === "/matchmaking/clip" && request.method === "POST") {
      try {
        const { lobby_id, clip_number, player_id, guess } = await request.json(); // clip_number is 1-indexed from client

        if (!lobby_id || !clip_number || !player_id || guess === undefined) {
          return new Response(JSON.stringify({ error: "Missing parameters for submitting guess." }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
        }

        const lobbyInfo = await env.MATCHMAKING.prepare("SELECT player_one, player_two, current_clip_number FROM matchmaking WHERE lobby_id = ?").bind(lobby_id).first();

        if (!lobbyInfo) {
          return new Response(JSON.stringify({ error: "Lobby not found." }), { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } });
        }

        if (clip_number !== lobbyInfo.current_clip_number) {
          console.warn(`WORKER: Player ${player_id} tried to submit for clip ${clip_number}, but server is on clip ${lobbyInfo.current_clip_number} for lobby ${lobby_id}`);
          return new Response(JSON.stringify({ error: `Guess for incorrect clip number. Server is on clip ${lobbyInfo.current_clip_number}.` }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
        }
        
        let guessColumn;
        if (player_id === lobbyInfo.player_one) {
          guessColumn = `clip${clip_number}_p1_guess`;
        } else if (player_id === lobbyInfo.player_two) {
          guessColumn = `clip${clip_number}_p2_guess`;
        } else {
          return new Response(JSON.stringify({ error: "Player ID does not match players in lobby." }), { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } });
        }

        await env.MATCHMAKING.prepare(
          `UPDATE matchmaking SET ${guessColumn} = ?, last_updated_at = CURRENT_TIMESTAMP WHERE lobby_id = ?`
        ).bind(guess, lobby_id).run();
        
        console.log(`WORKER: Lobby ${lobby_id}, Clip ${clip_number}: Player ${player_id} guessed ${guess}. Column: ${guessColumn}`);

        // Check if both players have submitted for the current clip
        // This logic might be simplified if pollLobbyStatus on client handles advancements more directly
        const p1GuessCol = `clip${clip_number}_p1_guess`;
        const p2GuessCol = `clip${clip_number}_p2_guess`;
        const currentGuesses = await env.MATCHMAKING.prepare(
          `SELECT ${p1GuessCol}, ${p2GuessCol} FROM matchmaking WHERE lobby_id = ?`
        ).bind(lobby_id).first();

        const p1HasGuessed = currentGuesses[p1GuessCol] !== null && currentGuesses[p1GuessCol] !== undefined;
        const p2HasGuessed = currentGuesses[p2GuessCol] !== null && currentGuesses[p2GuessCol] !== undefined;
        
        if (p1HasGuessed && p2HasGuessed) {
          console.log(`WORKER: Both players submitted for clip ${clip_number} in lobby ${lobby_id}`);
          if (clip_number < 5) {
            const nextClipNumber = clip_number + 1;
            await env.MATCHMAKING.prepare(
              "UPDATE matchmaking SET current_clip_number = ?, last_updated_at = CURRENT_TIMESTAMP WHERE lobby_id = ?"
            ).bind(nextClipNumber, lobby_id).run();
            console.log(`WORKER: Advanced lobby ${lobby_id} to clip ${nextClipNumber}`);
          } else {
            console.log(`WORKER: Both players submitted for final clip (5) in lobby ${lobby_id}. Match ready to be finished.`);
          }
        }
        return new Response(JSON.stringify({ message: "Guess received." }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders }});
      } catch (e) {
        console.error(`WORKER ERROR (/matchmaking/clip): ${e.message}`, e.stack);
        return new Response(JSON.stringify({ error: "Internal worker error during clip submission.", details: e.message }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
      }
    }
    if (url.pathname === "/matchmaking/finish" && request.method === "POST") {
      try {
        const { lobby_id } = await request.json();
        
        const lobbyData = await env.MATCHMAKING.prepare(
          `SELECT player_one, player_two, 
                  video_for_clip1, video_for_clip2, video_for_clip3, video_for_clip4, video_for_clip5,
                  clip1_p1_guess, clip1_p2_guess, clip2_p1_guess, clip2_p2_guess, 
                  clip3_p1_guess, clip3_p2_guess, clip4_p1_guess, clip4_p2_guess, 
                  clip5_p1_guess, clip5_p2_guess 
           FROM matchmaking WHERE lobby_id = ?`
        ).bind(lobby_id).first();

        if (!lobbyData) {
            return new Response(JSON.stringify({ error: "Lobby not found for finishing." }), { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders }});
        }

        const getVideoTrueRank = (videoUrl) => {
            const videoObject = videoLinks.find(v => v.link === videoUrl);
            return videoObject ? videoObject.trueRank : null;
        };

        const trueRanks = [
            getVideoTrueRank(lobbyData.video_for_clip1),
            getVideoTrueRank(lobbyData.video_for_clip2),
            getVideoTrueRank(lobbyData.video_for_clip3),
            getVideoTrueRank(lobbyData.video_for_clip4),
            getVideoTrueRank(lobbyData.video_for_clip5)
        ];

        let p1Score = 0;
        let p2Score = 0;

        const guessesP1 = [lobbyData.clip1_p1_guess, lobbyData.clip2_p1_guess, lobbyData.clip3_p1_guess, lobbyData.clip4_p1_guess, lobbyData.clip5_p1_guess];
        const guessesP2 = [lobbyData.clip1_p2_guess, lobbyData.clip2_p2_guess, lobbyData.clip3_p2_guess, lobbyData.clip4_p2_guess, lobbyData.clip5_p2_guess];

        for (let i = 0; i < 5; i++) {
            if (trueRanks[i]) { 
                if (guessesP1[i] === trueRanks[i]) p1Score++;
                if (guessesP2[i] === trueRanks[i]) p2Score++;
            }
        }
        
        let matchWinnerId = null;
        if (p1Score > p2Score) {
            matchWinnerId = lobbyData.player_one;
        } else if (p2Score > p1Score) {
            matchWinnerId = lobbyData.player_two;
        } else {
            matchWinnerId = "Draw"; 
        }
        
        await env.MATCHMAKING.prepare(
          "UPDATE matchmaking SET winner = ?, last_updated_at = CURRENT_TIMESTAMP WHERE lobby_id = ?"
        ).bind(matchWinnerId, lobby_id).run();
        
        console.log(`WORKER: Lobby ${lobby_id} finished. P1 Score: ${p1Score}, P2 Score: ${p2Score}. Winner: ${matchWinnerId}`);
        return new Response(JSON.stringify({ winner: matchWinnerId, player_one_score: p1Score, player_two_score: p2Score }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
      } catch (e) {
        console.error(`WORKER ERROR (/matchmaking/finish): ${e.message}`, e.stack);
        return new Response(JSON.stringify({ error: "Internal worker error during finish.", details: e.message }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
      }
    }
    if (url.pathname === "/matchmaking/results" && request.method === "GET") {
      try {
        const lobby_id = url.searchParams.get("lobby_id");
        const row = await env.MATCHMAKING.prepare(
          `SELECT 
            player_one, player_two, 
            video_for_clip1, video_for_clip2, video_for_clip3, video_for_clip4, video_for_clip5,
            clip1_p1_guess, clip1_p2_guess,
            clip2_p1_guess, clip2_p2_guess,
            clip3_p1_guess, clip3_p2_guess,
            clip4_p1_guess, clip4_p2_guess,
            clip5_p1_guess, clip5_p2_guess,
            winner, expired, current_clip_number 
          FROM matchmaking WHERE lobby_id = ?`
        ).bind(lobby_id).first();

        if (!row) {
           return new Response(JSON.stringify({ error: "Results not found for lobby." }), { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } });
        }
        const getVideoTrueRank = (videoUrl) => {
          const videoObject = videoLinks.find(v => v.link === videoUrl);
          return videoObject ? videoObject.trueRank : null;
        };
        const true_ranks = {
          clip1: getVideoTrueRank(row.video_for_clip1),
          clip2: getVideoTrueRank(row.video_for_clip2),
          clip3: getVideoTrueRank(row.video_for_clip3),
          clip4: getVideoTrueRank(row.video_for_clip4),
          clip5: getVideoTrueRank(row.video_for_clip5),
        };

        return new Response(JSON.stringify({...row, true_ranks}), { headers: { "Content-Type": "application/json", ...corsHeaders } });
      } catch (e) {
        console.error(`WORKER ERROR (/matchmaking/results): ${e.message}`, e.stack);
        return new Response(JSON.stringify({ error: "Internal worker error during results fetch.", details: e.message }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
      }
    }
    if (url.pathname === "/matchmaking/leave" && request.method === "POST") {
      try {
        const { lobby_id } = await request.json();
        await env.MATCHMAKING.prepare(
          "UPDATE matchmaking SET expired = TRUE, last_updated_at = CURRENT_TIMESTAMP WHERE lobby_id = ?"
        ).bind(lobby_id).run();
        return new Response(null, { status: 204, headers: corsHeaders });
      } catch (e) {
        console.error(`WORKER ERROR (/matchmaking/leave): ${e.message}`, e.stack);
        return new Response(JSON.stringify({ error: "Internal worker error during leave.", details: e.message }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
      }
    }
    return new Response("Not found", { status: 404, headers: corsHeaders });
  }
} 