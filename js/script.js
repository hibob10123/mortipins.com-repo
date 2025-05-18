function on() {
    // display overlay
    const turnOn = document.getElementById("overlay");
    turnOn.style.display = "block";
    // turn off vertical scroll
    const overflow = document.querySelector("body");
    overflow.style.overflow = "hidden";
}

function off() {
    // hide overlay
    const turnOff = document.getElementById("overlay");
    turnOff.style.display = "none";
    // turn on vertical scroll 
    const overflow = document.querySelector("body");
    overflow.style.overflow = "auto";
}

const videoLinks = [
    { link: "https://www.youtube.com/embed/B79hw1wCoS0", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/MH1YnfTBF6I", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/hk7BTKrno0k", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/gvdweIU9m3c", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/JZ3faitUC2Q", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/nL7X9SIAobE", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/9vxfjvEUW7o", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/8604H206UyA", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/w_RTZjaMcxk", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/9o5Vjnm--YE", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/ZTYelONAofo", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/X0oOGzNN-oc", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/5ArRe0CKkbo", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/iw_dGyd3ZVo", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/x6HeUojc8OA", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/zDx6lBZSwG0", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/-Jo_v4kkYQA", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/Ivp5MWRgyuA", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/5_wOpRsc1tk", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/2SyxfBHgGJQ", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/oeoF_gqheHE", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/kQRrHBP-veo", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/qcio5lZXXL8", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/OHz4bg2IV_8", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/xtbva7378mk", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/dYkxdNXdmhU", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/BM9ctZcl758", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/vkoBgA5OT50", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/sRVYXzejenc", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/2_syHedgZGI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/tvCtPuxuE90", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/436S1Obe7qQ", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/AgOj9GDoI5Q", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/n-zsfJtEpmM", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/x6HeUojc8OA", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/0T7B9PjxBJI", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/Bd_rf3Vev0w", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/UIs5rvLqBXI", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/BLoEXkfWDgI", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/ShOdTN0tDm4", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/hk7BTKrno0k", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/0AXVCmfWtuE", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/sXZnxoWWPxI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/mA98NO-AiQA", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/SWzwJfpey34", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/dHyq-PiGeJQ", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/orSXtoUKVKo", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/attachments", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/QJwzaKrJK3w", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/O8Ve9b2TjYM", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/nB-_mrAFMqU", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/xh_mCSahmHQ", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/7EvMCC1AaJI", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/XDSRRgop7Ck", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/7eEVqPa5rXQ", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/yGwzCN1P0SI", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/hyEI30VzoE4", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/AjLK0D2U5yw", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/VbybAv97zl4", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/oFmhq-RFMDg", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/tMVv4xepwOM", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/WTor8aq6EUs", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/guest-login", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/LCWislFwdw0", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/Tz8OSB_8Kkc", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/sRK5yKvduXw", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/Hx12w1DlWEE", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/AH0aCSX2Z0Y", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/E5Ixj-Nl9fg", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/8wQDwAW7v6E", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/MkO0PU0iMD4", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/m8zJRLVOLbs", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/C-5TcH8vh8U", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/-HRZ_0x35d4", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/UEMLZ_2Vs1g", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/CXxg4B3wCDc", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/UzlUp_T_048", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/_KXxTGwEydA", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/nRSjsMQNOus", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/U9YvpRO0wcA", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/1prdzrHmTAa", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/25INMcWVZLI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/1ZxSxc5eSfk", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/EeOyEOhkNBc", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/AOUYD6Tu-us", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/qc2hzIXF28M", trueRank: "Silver", guesses: [] },
    { link: "https://www.youtube.com/embed/-1EsK0iNE_8", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/OHNIK5hY884", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Uq37V_N7VB8", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/WaKFkDs6uUc", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Qwhs0bA-bhw", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/Diikb5VTVz0", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/8ODyf91sgqE", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/qvdgMBFnpPw", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/J4Cu2B4JybY", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/LTYgmxyHcZg", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/Ay2dS6kshWA", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/XqDCeLydkhI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/62_d3v5YNx0", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/kQRrHBP-veo", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/3MA9uzJVvGI", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/C0_OqjSocvA", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/yaFfh3DZZtE", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/IbLjFyxVRWo", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/mTc3O1smvRU", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/--8Ph4IB46Q", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/-1EsK0iNE_8", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/d3zpHzyF6d0", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Ff5P6XanTQk", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/CUrbZ0Gny34", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/zTLw9wFIlF0", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/7ZH9DXWgIZA", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/vyHfRwVceqo", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/2obdN4JsOYk", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/jz3gFnsqrqM", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/vEtQfLdpXMg", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/QLSfXF_Qt-8", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/PYiubkEhf1I", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/cj1XmlDxnDs", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/QKCwEU8yI88", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/0i9gbTQrDN8", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/mTc3O1smvRU", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/XTUnnIN0KG4", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/Mnn0g-orGHc", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/LTAQqRrSh94", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/j27YKvLKlXI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Dha7t8gnYe4", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/d69r2XjHe94", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/Rl6JiWFd5Z8", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/LQyU9QCH-vE", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/lZRrKYtmrZ0", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/aU-8mt4t08E", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/u_4qGc4TwIs", trueRank: "Silver", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/LmLFWlHCPko", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/oJtsKjF78DQ", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/Ye5DTeuOknc", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Xe3AuIcudVg", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/fc_7Deq4oyw", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/iN5Pm6RCuU0", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/I3MUY-cZZwc", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/Fjt46na_LGA", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/n-b_k0Nycaw", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/MqhIpLk58tE", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/Z8eCP859K9s", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/N0rr7BxAap4", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/NG61SAV-_CY", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/UrElWiG6weQ", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/_T0kQJnjtn4", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/mrLl2hsDKE0", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/z8idXBnsKkM", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/pBY5p_wNSU4", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/XT4MkBLlAog", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/xJV38Had9uA", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/1P1V26UP114", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/N8RTl28QCYw", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/nJjNkNX6bdk", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/xmgYR12sIJ4", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/8CBCAtUMZPc", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/cMb2SHQU3Mo", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/KSZOiAqpGe4", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/IeqpEe1LFUE", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/6No_evYamko", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/OD1naIVT1Aw", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/F5LTyXmrGaQ", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/dTc2dvysCxM", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/rFPvDFkKUbs", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/oBMeZJx_hjs", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/GxlG74B6rwo", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/X4KDe0NXr_4", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/WsgqqmCguAQ", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/XCjtseC0Lsc", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/2Gn4-BllRc8", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/XCjtseC0Lsc", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/b-SWjZmz_aE", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/v1TerH0rqGU", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/fBhCJhpO1Dw", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/qCC3nGOTIiE", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/AwnpLM63pH8", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Ayj-yzgMnlA", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/u_4qGc4TwIs", trueRank: "Silver", guesses: [] },
    { link: "https://www.youtube.com/embed/mLx83oQLRoc", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/_U-MF4PUd7c", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/ersaWEt4Vuc", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/8-eT1MTELpc", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/ksHuXONEtuI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/4MD8nuX39es", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/8AxzOwwxNsI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/LViQBR_CiCw", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/HLWHpHkWuy8", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/2jTkzaf1ymw", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/IJOcgZej8Nc", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/eikRuhoft_0", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/Vb9WeKROv40", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/iw_dGyd3ZVo", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/OXnmtUPUitQ", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/0uOLwzlG3-Y", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/ryQI9JEcLGc", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/Pmr7xdeWxsM", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/Pmr7xdeWxsM", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/AFXSw1lRRco", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/ODjO2bn-bvU", trueRank: "Silver", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/RPepxKvmLgw", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/KlNSyZYj4hk", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/kkmknDH18f8", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/uKGPNwsqyZA", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/OyM9xeZTfx4", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/Q3sOpnXO8iQ", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/djFFOWeYwTQ", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/X4l6wFtgLQc", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/eFfvP8-XjVg", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/m7jhi4uj-no", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/J2xif3YXB1c", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/OVOYLgQfsc4", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/Cbqk2EsjHgU", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/k02c08f1tDc", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/Qx_zDRVVUvQ", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/RW9jdSiYq1g", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/py3hoX29pBc", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/rI3IJBxpQuU", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/ae0HzlL-GL8", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/8Ym9P_1h4OQ", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/v3rfOVCx_Bk", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/j_WLSHgvPMI", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/Cb68u2DcS-M", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/5rNmNOCimzo", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/3CTb92Va_I8", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/NkqQZyVYJzE", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/Zf4yyFfLJGw", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/dhvyuz8KKZw", trueRank: "Bronze", guesses: [] },
    { link: "https://www.youtube.com/embed/4Z77VhLQ2II", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/oj9bpzrmEP8", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/VAd_w1N5ctI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/-Bvw2pZEsok", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/QUqzbZnFYa0", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/HXuFDFntEBY", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/YQ2qYuL7Yik", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/8rPrsHypK1E", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/fOzL2M-Rs1M", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/ZKkrBi6fbDw", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/lslQSk5M2cI", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/awUls0cfWpE", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/qstQ7XxNvwY", trueRank: "Masters", guesses: [] },
];

const videoTrophyLinks = [
    { link: "https://www.youtube.com/embed/-1EsK0iNE_8", trueTrophy: "38000", guesses: [] },
    { link: "https://www.youtube.com/embed/OHNIK5hY884", trueTrophy: "32000", guesses: [] },
    { link: "https://www.youtube.com/embed/WaKFkDs6uUc", trueTrophy: "75000", guesses: [] },
    { link: "https://www.youtube.com/embed/Qwhs0bA-bhw", trueTrophy: "70000", guesses: [] },
    { link: "https://www.youtube.com/embed/Diikb5VTVz0", trueTrophy: "25000", guesses: [] },
    { link: "https://www.youtube.com/embed/8ODyf91sgqE", trueTrophy: "57000", guesses: [] },
    { link: "https://www.youtube.com/embed/qvdgMBFnpPw", trueTrophy: "32000", guesses: [] },
    { link: "https://www.youtube.com/embed/J4Cu2B4JybY", trueTrophy: "22000", guesses: [] },
    { link: "https://www.youtube.com/embed/Ay2dS6kshWA", trueTrophy: "25691", guesses: [] },
    { link: "https://www.youtube.com/embed/kQRrHBP-veo", trueTrophy: "48000", guesses: [] },
    { link: "https://www.youtube.com/embed/3MA9uzJVvGI", trueTrophy: "42000", guesses: [] },
    { link: "https://www.youtube.com/embed/C0_OqjSocvA", trueTrophy: "38200", guesses: [] },
    { link: "https://www.youtube.com/embed/yaFfh3DZZtE", trueTrophy: "43000", guesses: [] },
    { link: "https://www.youtube.com/embed/IbLjFyxVRWo", trueTrophy: "23757", guesses: [] },
    { link: "https://www.youtube.com/embed/d3zpHzyF6d0", trueTrophy: "40000", guesses: [] },
    { link: "https://www.youtube.com/embed/Ff5P6XanTQk", trueTrophy: "28000", guesses: [] },
    { link: "https://www.youtube.com/embed/CUrbZ0Gny34", trueTrophy: "39000", guesses: [] },
    { link: "https://www.youtube.com/embed/zTLw9wFIlF0", trueTrophy: "17132", guesses: [] },
    { link: "https://www.youtube.com/embed/7ZH9DXWgIZA", trueTrophy: "55000", guesses: [] },
    { link: "https://www.youtube.com/embed/vyHfRwVceqo", trueTrophy: "25000", guesses: [] },
    { link: "https://www.youtube.com/embed/2obdN4JsOYk", trueTrophy: "26973", guesses: [] },
    { link: "https://www.youtube.com/embed/jz3gFnsqrqM", trueTrophy: "100000", guesses: [] },
    { link: "https://www.youtube.com/embed/vEtQfLdpXMg", trueTrophy: "40000", guesses: [] },
    { link: "https://www.youtube.com/embed/QLSfXF_Qt-8", trueTrophy: "37390", guesses: [] },
    { link: "https://www.youtube.com/embed/PYiubkEhf1I", trueTrophy: "44000", guesses: [] },
    { link: "https://www.youtube.com/embed/cj1XmlDxnDs", trueTrophy: "4000", guesses: [] },
    { link: "https://www.youtube.com/embed/QKCwEU8yI88", trueTrophy: "20000", guesses: [] },
    { link: "https://www.youtube.com/embed/0i9gbTQrDN8", trueTrophy: "19555", guesses: [] },
    { link: "https://www.youtube.com/embed/mTc3O1smvRU", trueTrophy: "47094", guesses: [] },
    { link: "https://www.youtube.com/embed/XTUnnIN0KG4", trueTrophy: "20771", guesses: [] },
    { link: "https://www.youtube.com/embed/Mnn0g-orGHc", trueTrophy: "15000", guesses: [] },
    { link: "https://www.youtube.com/embed/j27YKvLKlXI", trueTrophy: "31256", guesses: [] },
    { link: "https://www.youtube.com/embed/d69r2XjHe94", trueTrophy: "62454", guesses: [] },
    { link: "https://www.youtube.com/embed/Rl6JiWFd5Z8", trueTrophy: "24485", guesses: [] },
    { link: "https://www.youtube.com/embed/LQyU9QCH-vE", trueTrophy: "63000", guesses: [] },
    { link: "https://www.youtube.com/embed/lZRrKYtmrZ0", trueTrophy: "63000", guesses: [] },
    { link: "https://www.youtube.com/embed/aU-8mt4t08E", trueTrophy: "40790", guesses: [] },
    { link: "https://www.youtube.com/embed/u_4qGc4TwIs", trueTrophy: "8712", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueTrophy: "24000", guesses: [] },
    { link: "https://www.youtube.com/embed/LmLFWlHCPko", trueTrophy: "45000", guesses: [] },
    { link: "https://www.youtube.com/embed/oJtsKjF78DQ", trueTrophy: "45000", guesses: [] },
    { link: "https://www.youtube.com/embed/Xe3AuIcudVg", trueTrophy: "78000", guesses: [] },
    { link: "https://www.youtube.com/embed/fc_7Deq4oyw", trueTrophy: "40468", guesses: [] },
    { link: "https://www.youtube.com/embed/us--hJmbmBk", trueTrophy: "5976", guesses: [] },
    { link: "https://www.youtube.com/embed/iN5Pm6RCuU0", trueTrophy: "7000", guesses: [] },
    { link: "https://www.youtube.com/embed/Fjt46na_LGA", trueTrophy: "33611", guesses: [] },
    { link: "https://www.youtube.com/embed/MqhIpLk58tE", trueTrophy: "20000", guesses: [] },
    { link: "https://www.youtube.com/embed/Z8eCP859K9s", trueTrophy: "36000", guesses: [] },
    { link: "https://www.youtube.com/embed/N0rr7BxAap4", trueTrophy: "36000", guesses: [] },
    { link: "https://www.youtube.com/embed/NG61SAV-_CY", trueTrophy: "26500", guesses: [] },
    { link: "https://www.youtube.com/embed/UrElWiG6weQ", trueTrophy: "39100", guesses: [] },
    { link: "https://www.youtube.com/embed/_T0kQJnjtn4", trueTrophy: "11111", guesses: [] },
    { link: "https://www.youtube.com/embed/mrLl2hsDKE0", trueTrophy: "29000", guesses: [] },
    { link: "https://www.youtube.com/embed/z8idXBnsKkM", trueTrophy: "62738", guesses: [] },
    { link: "https://www.youtube.com/embed/pBY5p_wNSU4", trueTrophy: "18665", guesses: [] },
    { link: "https://www.youtube.com/embed/xJV38Had9uA", trueTrophy: "36779", guesses: [] },
    { link: "https://www.youtube.com/embed/1P1V26UP114", trueTrophy: "82039", guesses: [] },
    { link: "https://www.youtube.com/embed/N8RTl28QCYw", trueTrophy: "36500", guesses: [] },
    { link: "https://www.youtube.com/embed/nJjNkNX6bdk", trueTrophy: "50000", guesses: [] },
    { link: "https://www.youtube.com/embed/8CBCAtUMZPc", trueTrophy: "12000", guesses: [] },
    { link: "https://www.youtube.com/embed/T4e-1sgkkDA", trueTrophy: "110829", guesses: [] },
    { link: "https://www.youtube.com/embed/cMb2SHQU3Mo", trueTrophy: "18000", guesses: [] },
    { link: "https://www.youtube.com/embed/IeqpEe1LFUE", trueTrophy: "34000", guesses: [] },
    { link: "https://www.youtube.com/embed/6No_evYamko", trueTrophy: "85585", guesses: [] },
    { link: "https://www.youtube.com/embed/OD1naIVT1Aw", trueTrophy: "85000", guesses: [] },
    { link: "https://www.youtube.com/embed/F5LTyXmrGaQ", trueTrophy: "78124", guesses: [] },
    { link: "https://www.youtube.com/embed/dTc2dvysCxM", trueTrophy: "69120", guesses: [] },
    { link: "https://www.youtube.com/embed/oBMeZJx_hjs", trueTrophy: "40800", guesses: [] },
    { link: "https://www.youtube.com/embed/GxlG74B6rwo", trueTrophy: "52984", guesses: [] },
    { link: "https://www.youtube.com/embed/WsgqqmCguAQ", trueTrophy: "25000", guesses: [] },
    { link: "https://www.youtube.com/embed/XCjtseC0Lsc", trueTrophy: "32857", guesses: [] },
    { link: "https://www.youtube.com/embed/2Gn4-BllRc8", trueTrophy: "73000", guesses: [] },
    { link: "https://www.youtube.com/embed/XCjtseC0Lsc", trueTrophy: "32857", guesses: [] },
    { link: "https://www.youtube.com/embed/b-SWjZmz_aE", trueTrophy: "60000", guesses: [] },
    { link: "https://www.youtube.com/embed/v1TerH0rqGU", trueTrophy: "44000", guesses: [] },
    { link: "https://www.youtube.com/embed/fBhCJhpO1Dw", trueTrophy: "40000", guesses: [] },
    { link: "https://www.youtube.com/embed/qCC3nGOTIiE", trueTrophy: "50000", guesses: [] },
    { link: "https://www.youtube.com/embed/AwnpLM63pH8", trueTrophy: "46716", guesses: [] },
    { link: "https://www.youtube.com/embed/XiLu-UEhcFQ", trueTrophy: "31000", guesses: [] },
    { link: "https://www.youtube.com/embed/Ayj-yzgMnlA", trueTrophy: "18000", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueTrophy: "45000", guesses: [] },
    { link: "https://www.youtube.com/embed/mLx83oQLRoc", trueTrophy: "26000", guesses: [] },
    { link: "https://www.youtube.com/embed/_U-MF4PUd7c", trueTrophy: "84504", guesses: [] },
    { link: "https://www.youtube.com/embed/S-6j11KWkkU", trueTrophy: "57000", guesses: [] },
    { link: "https://www.youtube.com/embed/ersaWEt4Vuc", trueTrophy: "50254", guesses: [] },
    { link: "https://www.youtube.com/embed/ersaWEt4Vuc", trueTrophy: "50247", guesses: [] },
    { link: "https://www.youtube.com/embed/8-eT1MTELpc", trueTrophy: "32857", guesses: [] },
    { link: "https://www.youtube.com/embed/ksHuXONEtuI", trueTrophy: "13047", guesses: [] },
    { link: "https://www.youtube.com/embed/4MD8nuX39es", trueTrophy: "42747", guesses: [] },
    { link: "https://www.youtube.com/embed/4MD8nuX39es", trueTrophy: "42747", guesses: [] },
    { link: "https://www.youtube.com/embed/8AxzOwwxNsI", trueTrophy: "38000", guesses: [] },
    { link: "https://www.youtube.com/embed/LViQBR_CiCw", trueTrophy: "14000", guesses: [] },
    { link: "https://www.youtube.com/embed/HLWHpHkWuy8", trueTrophy: "74000", guesses: [] },
    { link: "https://www.youtube.com/embed/2jTkzaf1ymw", trueTrophy: "31534", guesses: [] },
    { link: "https://www.youtube.com/embed/IJOcgZej8Nc", trueTrophy: "70000", guesses: [] },
    { link: "https://www.youtube.com/embed/Vb9WeKROv40", trueTrophy: "34000", guesses: [] },
    { link: "https://www.youtube.com/embed/iw_dGyd3ZVo", trueTrophy: "65644", guesses: [] },
    { link: "https://www.youtube.com/embed/OXnmtUPUitQ", trueTrophy: "50500", guesses: [] },
    { link: "https://www.youtube.com/embed/0uOLwzlG3-Y", trueTrophy: "30000", guesses: [] },
    { link: "https://www.youtube.com/embed/ryQI9JEcLGc", trueTrophy: "24101", guesses: [] },
    { link: "https://www.youtube.com/embed/Pmr7xdeWxsM", trueTrophy: "34500", guesses: [] },
    { link: "https://www.youtube.com/embed/Pmr7xdeWxsM", trueTrophy: "34500", guesses: [] },
    { link: "https://www.youtube.com/embed/AFXSw1lRRco", trueTrophy: "37000", guesses: [] },
    { link: "https://www.youtube.com/embed/gSZl6CZ2BaQ", trueTrophy: "29116", guesses: [] },
    { link: "https://www.youtube.com/embed/5czwWqBgSMw", trueTrophy: "82000", guesses: [] },
    { link: "https://www.youtube.com/embed/LTYgmxyHcZg", trueTrophy: "140000", guesses: [] },
    { link: "https://www.youtube.com/embed/ODjO2bn-bvU", trueTrophy: "4098", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueTrophy: "24000", guesses: [] },
    { link: "https://www.youtube.com/embed/RPepxKvmLgw", trueTrophy: "34100", guesses: [] },
    { link: "https://www.youtube.com/embed/KlNSyZYj4hk", trueTrophy: "24019", guesses: [] },
    { link: "https://www.youtube.com/embed/W9VOpoqdR2E", trueTrophy: "15000", guesses: [] },
    { link: "https://www.youtube.com/embed/kkmknDH18f8", trueTrophy: "30000", guesses: [] },
    { link: "https://www.youtube.com/embed/uKGPNwsqyZA", trueTrophy: "61000", guesses: [] },
    { link: "https://www.youtube.com/embed/OyM9xeZTfx4", trueTrophy: "74000", guesses: [] },
    { link: "https://www.youtube.com/embed/Q3sOpnXO8iQ", trueTrophy: "10722", guesses: [] },
    { link: "https://www.youtube.com/embed/djFFOWeYwTQ", trueTrophy: "10722", guesses: [] },
    { link: "https://www.youtube.com/embed/X4l6wFtgLQc", trueTrophy: "33541", guesses: [] },
    { link: "https://www.youtube.com/embed/eFfvP8-XjVg", trueTrophy: "65000", guesses: [] },
    { link: "https://www.youtube.com/embed/m7jhi4uj-no", trueTrophy: "22425", guesses: [] },
    { link: "https://www.youtube.com/embed/J2xif3YXB1c", trueTrophy: "19300", guesses: [] },
    { link: "https://www.youtube.com/embed/OVOYLgQfsc4", trueTrophy: "8000", guesses: [] },
    { link: "https://www.youtube.com/embed/Cbqk2EsjHgU", trueTrophy: "43287", guesses: [] },
    { link: "https://www.youtube.com/embed/k02c08f1tDc", trueTrophy: "43872", guesses: [] },
    { link: "https://www.youtube.com/embed/Qx_zDRVVUvQ", trueTrophy: "11272", guesses: [] },
    { link: "https://www.youtube.com/embed/RW9jdSiYq1g", trueTrophy: "36700", guesses: [] },
    { link: "https://www.youtube.com/embed/py3hoX29pBc", trueTrophy: "77000", guesses: [] },
    { link: "https://www.youtube.com/embed/rI3IJBxpQuU", trueTrophy: "18778", guesses: [] },
    { link: "https://www.youtube.com/embed/ae0HzlL-GL8", trueTrophy: "23598", guesses: [] },
    { link: "https://www.youtube.com/embed/8Ym9P_1h4OQ", trueTrophy: "10742", guesses: [] },
    { link: "https://www.youtube.com/embed/j_WLSHgvPMI", trueTrophy: "58300", guesses: [] },
    { link: "https://www.youtube.com/embed/Cb68u2DcS-M", trueTrophy: "23744", guesses: [] },
    { link: "https://www.youtube.com/embed/-Iuq2b3_CiY", trueTrophy: "25260", guesses: [] },
    { link: "https://www.youtube.com/embed/5rNmNOCimzo", trueTrophy: "42000", guesses: [] },
    { link: "https://www.youtube.com/embed/3CTb92Va_I8", trueTrophy: "27200", guesses: [] },
    { link: "https://www.youtube.com/embed/NkqQZyVYJzE", trueTrophy: "36983", guesses: [] },
    { link: "https://www.youtube.com/embed/lqDzn2YOPwE", trueTrophy: "17294", guesses: [] },
    { link: "https://www.youtube.com/embed/Zf4yyFfLJGw", trueTrophy: "75000", guesses: [] },
    { link: "https://www.youtube.com/embed/dhvyuz8KKZw", trueTrophy: "2300", guesses: [] },
    { link: "https://www.youtube.com/embed/4Z77VhLQ2II", trueTrophy: "32000", guesses: [] },
    { link: "https://www.youtube.com/embed/oj9bpzrmEP8", trueTrophy: "32000", guesses: [] },
    { link: "https://www.youtube.com/embed/VAd_w1N5ctI", trueTrophy: "32000", guesses: [] },
    { link: "https://www.youtube.com/embed/-Bvw2pZEsok", trueTrophy: "26160", guesses: [] },
    { link: "https://www.youtube.com/embed/QUqzbZnFYa0", trueTrophy: "41340", guesses: [] },
    { link: "https://www.youtube.com/embed/HXuFDFntEBY", trueTrophy: "32000", guesses: [] },
    { link: "https://www.youtube.com/embed/YQ2qYuL7Yik", trueTrophy: "52386", guesses: [] },
    { link: "https://www.youtube.com/embed/fOzL2M-Rs1M", trueTrophy: "43000", guesses: [] },
    { link: "https://www.youtube.com/embed/ZKkrBi6fbDw", trueTrophy: "17243", guesses: [] },
    { link: "https://www.youtube.com/embed/lslQSk5M2cI", trueTrophy: "75600", guesses: [] },
    { link: "https://www.youtube.com/embed/awUls0cfWpE", trueTrophy: "30254", guesses: [] },
];

const videoDailyNumber = 238;

const videoLinksDaily = [
    videoLinks[videoDailyNumber],
]

const rankNames = ["Bronze", "Silver", "Gold", "Diamond", "Mythic", "Legendary", "Masters"];

let currentVideoIndex = 0;
let currentTrophyVideoIndex = 0;
let selectedRank = null;
let selectedRankName = null;
let selectedTrophyCount = 1;
let streak = 0;
let score = 0;
let hearts = 3;

// Multiplayer specific variables
let multiplayerLobbyId = null;
let multiplayerPlayerId = null; // Unique ID for the current player in a session
let currentPlayerRole = null; // Will be 'p1' or 'p2'
let pollIntervalId = null; // Stores the ID for setInterval
const WORKER_URL = 'https://mortipins-multiplayer.imenkei64.workers.dev'; // Worker URL
let multiplayerVideoQueue = []; // Holds the video links for the current match
let currentMultiplayerClipIndex = 0; // 0-indexed for the video queue
let currentMultiplayerClipNumberForDisplay = 1; // 1-indexed for display (Clip 1 of 5)
let playerOneName = ''; // To store Player 1's ID/name from server
let playerTwoName = ''; // To store Player 2's ID/name from server
let clipTimerIntervalId = null; // To store interval ID for the clip timer

function getRandomVideo() {
    currentVideoIndex = Math.floor(Math.random() * videoLinks.length);
    const videoFrame = document.getElementById("videoFrame");
    const rankDisplay = document.getElementById("rankDisplay");
    videoFrame.src = videoLinks[currentVideoIndex].link;
    
    if (rankDisplay) {
      rankDisplay.textContent = `True Rank: ${videoLinks[currentVideoIndex].trueRank}`;
    }
}

function getRandomTrophyVideo() {
    currentTrophyVideoIndex = Math.floor(Math.random() * videoTrophyLinks.length);
    const videoFrameTrophy = document.getElementById("videoFrameTrophy");
    videoFrameTrophy.src = videoTrophyLinks[currentTrophyVideoIndex].link;
    console.log('Current trophy video:', videoTrophyLinks[currentTrophyVideoIndex]);
}

function updateTrophyValue() {
    const slider = document.getElementById("trophyRange");
    const output = document.getElementById("trophyValue");
    output.innerHTML = slider.value;
    selectedTrophyCount = slider.value;
}

function getVideoDaily() {
    currentVideoIndex = Math.floor(Math.random() * videoLinksDaily.length);
    const videoFrame = document.getElementById("videoFrame");
    const rankDisplay = document.getElementById("rankDisplay");
    videoFrame.src = videoLinksDaily[currentVideoIndex].link;
    rankDisplay.textContent = `True Rank: ${videoLinksDaily[currentVideoIndex].trueRank}`;
}

function selectRank(rank) {
    selectedRank = rank;
    selectedRankName = rankNames[rank- 1];
    buttons = document.querySelectorAll('.rank-buttons img');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
    buttons[rank - 1].classList.add('selected');
    // Record the guess
    videoLinks[currentVideoIndex].guesses.push(selectedRankName);
}

function submitTrophyGuess() {
    const modal = document.getElementById("rankModal");
    const modalText = document.getElementById("modalText");
    const trueTrophy = videoTrophyLinks[currentTrophyVideoIndex].trueTrophy;
    const difference = Math.abs(selectedTrophyCount - trueTrophy);

    let inRange = false;
    if (trueTrophy >= 100000) {
        if (selectedTrophyCount >= 100000) {
            inRange = true;
        }
    } else{
        if (difference <= 7500) {
            inRange = true;
    }
    }

    if (inRange) {
        flashColor = 'rgba(0, 255, 0, 0.6)';
        if (difference <= 2500) {
            streak += 3;
            if (hearts < 3) {
                hearts++;
                updateHearts();
            }
        }
        else {
            streak++;
        }
    }
    else {
        flashColor = 'rgba(255, 0, 0, 0.6)';
        hearts--;
        updateHearts();
        if (hearts === 0) {
            modal.style.display = "none";
            showLoseModal();
            return;
        }
    }
    updateStreakDisplay();

    document.documentElement.style.setProperty('--flash-color', flashColor);
     document.body.classList.add('flash');
     setTimeout(() => {
         document.body.classList.remove('flash');
         document.body.style.backgroundColor = 'var(--gray5)';
     }, 500);
 

      modalText.innerHTML = `
        <div class="modal-content-wrapper">
            <div class="modal-section">
                <p class="modal-label">Your Guess:</p>
                <p class="modal-value">${selectedTrophyCount}</p>
            </div>
            <div class="modal-section">
                <p class="modal-label">True Trophy Count:</p>
                <p class="modal-value">${trueTrophy}</p>
            </div>
            <div class="modal-section">
                <p class="modal-label">Difference:</p>
                <p class="modal-value">${difference}</p>
            </div>
        </div>
    `;
    modal.style.display = "block";

    selectedTrophyCount = 1;
    document.getElementById("trophyRange").value = 1;
    document.getElementById("trophyValue").innerHTML = 1;
    getRandomTrophyVideo();
}

function updateHearts() {
    for (let i = 1; i <= 3; i++) {
        const heart = document.getElementById(`heart${i}`);
        if (i <= hearts) {
            heart.style.visibility = 'visible';
        } else {
            heart.style.visibility = 'hidden';
        }
    }
}  

function showLoseModal() {
    const loseModal = document.getElementById("loseModal");
    const loseModalText = document.getElementById("loseModalText");
    loseModalText.innerHTML = `<p>You lost! Your score was ${streak}</p>`;
    
    loseModal.style.display = "block";
}

function restartGame() {
    streak = 0;
    hearts = 3;
    updateHearts();
    updateStreakDisplay();
    document.getElementById("loseModal").style.display = "none";
    getRandomTrophyVideo();
}

function submitGuess() {
    if (selectedRankName === null) {
        return;
    }
    const token = localStorage.getItem('token');

    /*
    if (!token) {
        alert('Please log in to earn points!');
        return;
    }
    */

    const modal = document.getElementById("rankModal");
    const modalText = document.getElementById("modalText");

    const rankOrder = ["Bronze", "Silver", "Gold", "Diamond", "Mythic", "Legendary", "Masters"];
    
    const trueRankIndex = rankOrder.indexOf(videoLinks[currentVideoIndex].trueRank); // Find true rank index
    const selectedRankIndex = rankOrder.indexOf(selectedRankName); // Find selected rank index
    const isCorrect = selectedRankIndex === trueRankIndex; // Check if the guess is correct

    console.log('True Rank Index:', trueRankIndex, 'Selected Rank Index:', selectedRankIndex);

    flashColor = isCorrect ? 'rgba(0, 255, 0, 0.6)' : 'rgba(255, 0, 0, 0.6)';
    
    // Flash the background color
    document.documentElement.style.setProperty('--flash-color', flashColor);
    document.body.classList.add('flash');
    setTimeout(() => {
        document.body.classList.remove('flash');
        document.body.style.backgroundColor = 'var(--gray5)';
    }, 500);

    /*
    modalText.innerHTML = `
        <p>You guessed: ${selectedRankName}</p>
        <p>True Rank: ${videoLinks[currentVideoIndex].trueRank}</p>
        <canvas id="guessDistributionChart" width="400" height="400"></canvas>
    `;
    modal.style.display = "block";
    */

    
    let points = 0;
    if (isCorrect) {
        points = 212210;
    } else {
        points = -12;
    }

    console.log('Points awarded:', points); // Log the points awarded

    // Add streak points
    if (streak >= 10) {
        points += 1000; // 10-win streak bonus
    } else if (streak >= 5) {
        points *= 2; // 5-win streak multiplier
    }

    console.log('Final points after streak adjustments:', points);

    // Ensure points-display exists
    let pointsDisplay = document.getElementById('points-display');
    if (!pointsDisplay) {
        pointsDisplay = document.createElement('span');
        pointsDisplay.id = 'points-display';
        pointsDisplay.textContent = '0'; // Set initial value
        document.body.appendChild(pointsDisplay); // Append it to the body or a specific container
    }

    
    Promise.all([
        fetch('https://solitary-star-3b20.caoalexander9-25f.workers.dev/api/guess', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                video_id: videoLinks[currentVideoIndex].link,
                guess: selectedRankName
            })
        }),
        fetch('https://mortipins-dashboard.imenkei64.workers.dev/update-points', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correctRank: videoLinks[currentVideoIndex].trueRank,
                guessedRank: selectedRankName,
                isCorrect: isCorrect,
                winStreak: streak
            })
        })
    ]).then(async ([guessResponse, pointsResponse]) => {
        if (!guessResponse.ok) {
            throw new Error(`HTTP error! status: ${guessResponse.status}`);
        }
        const guessData = await guessResponse.json();
        console.log('Guess submitted:', guessData);

        // Ensure pointsResponse is valid before handling it
        if (pointsResponse) {
            const pointsData = await pointsResponse.json();
            console.log('Points updated:', pointsData);

            // Extract the points value
            const updatedPoints = parseInt(pointsData.points, 10);
            console.log('Updated Points:', updatedPoints);

            // Update points display
            pointsDisplay.textContent = updatedPoints;
            points = updatedPoints;

            let pointsDelta = 0;
            if (points<=250) {
                pointsDelta = isCorrect ? 20 : -1;
            } else if (points<=500) {
                pointsDelta = isCorrect ? 18 : -2;
            } else if (points<=750) {
                pointsDelta = isCorrect ? 16 : -3;
            } else if (points<=1000) {
                pointsDelta = isCorrect ? 14 : -4;
            } else if (points<=2000) {
                pointsDelta = isCorrect ? 10 : -5;
            } else if (points<=2500) {
                pointsDelta = isCorrect ? 7 : -6;
            } else if (points<=3000) {
                pointsDelta = isCorrect ? 5 : -5;
            } else {
                pointsDelta = isCorrect ? 3 : -7;
            }
            console.log('Points Delta:', pointsDelta);

            if (token) {
                console.log('Pointewews:', points);
                modalText.innerHTML = `
                            <p>ELO ${pointsDelta >= 0 ? 'gained' : 'lost'}: ${pointsDelta}</p>
                            <p>You guessed: ${selectedRankName}</p>
                            <p>True Rank: ${videoLinks[currentVideoIndex].trueRank}</p>
                            <canvas id="guessDistributionChart" width="400" height="400"></canvas>
                        `;
                        modal.style.display = "block";
            } else {
                modalText.innerHTML = `
                    <p>LOGIN TO EARN POINTS!</p> 
                    <p>You guessed: ${selectedRankName}</p>
                    <p>True Rank: ${videoLinks[currentVideoIndex].trueRank}</p>
                    <canvas id="guessDistributionChart" width="400" height="400"></canvas>
                `;
                modal.style.display = "block";
            }
        }

        return showGuessDistribution(videoLinks[currentVideoIndex].link);
    }).then(() => {
        selectedRankName = null;
        buttons.forEach(button => {
            button.classList.remove('selected');
        });
        getRandomVideo();
    }).catch(error => {
        console.error('Error:', error);
    });
    
    

    if (isCorrect) {
        streak++;
    } else {
        streak = 0;
    }
    updateStreakDisplay();

}


function updateStreakDisplay() {
    const streakElement = document.getElementById("streak");
    streakElement.textContent = `Score: ${streak}`;
}

if (typeof Chart !== 'undefined') {
    console.log('Chart.js is loaded');
} else {
    console.error('Chart.js is not loaded');
}



function canSubmitGuess() {
    
    const lastGuessDate = localStorage.getItem('lastGuessDate');
    const today = new Date().toISOString().split('T')[0];

    return lastGuessDate !== today;
    
   return true;
}

function updateSubmitButton() {
    /*
    const submitButton = document.getElementById("submitButton");
    if (!canSubmitGuess()) {
        submitButton.textContent = "Already Submitted";
        submitButton.classList.add("disabled");
        submitButton.onclick = null; // Disable the click event
    } else {
        submitButton.textContent = "Submit Guess";
        submitButton.classList.remove("disabled");
        submitButton.onclick = submitGuessDaily; // Enable the click event
    }
        */
    submitButton.textContent = "Submit Guess";
        submitButton.classList.remove("disabled");
        submitButton.onclick = submitGuessDaily;
}


function submitGuessDaily() {
    if (selectedRankName === null) {
        console.log('No rank selected');
        return;
    }

    const modal = document.getElementById("rankModal");
    const modalText = document.getElementById("modalText");
    const trueRank = videoLinks[currentVideoIndex].trueRank;

    if (selectedRankName === trueRank) {
        flashColor = 'rgba(0, 255, 0, 0.6)';
    }
    else {
        flashColor = 'rgba(255, 0, 0, 0.6)';
    }

    document.documentElement.style.setProperty('--flash-color', flashColor);
     document.body.classList.add('flash');
     setTimeout(() => {
         document.body.classList.remove('flash');
         document.body.style.backgroundColor = 'var(--gray5)';
     }, 500);

    modalText.innerHTML = `
        <p>You guessed: ${selectedRankName}</p>
        <p>True Rank: ${trueRank}</p>
        <canvas id="guessDistributionChart" width="400" height="400"></canvas>
    `;
    modal.style.display = "block";

    console.log('Submitting guess:', {
        video_id: videoLinks[videoDailyNumber].link,
        guess: selectedRankName
    });

    fetch('https://solitary-star-3b20.caoalexander9-25f.workers.dev/api/guess', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            video_id: videoLinks[videoDailyNumber].link,
            guess: selectedRankName
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        console.log('Guess submitted:', data);
        showGuessDistribution(videoLinks[videoDailyNumber].link);

        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('lastGuessDate', today);
        updateSubmitButton();
    }).catch(error => {
        console.error('Error:', error);
    });

    selectedRankName = null;
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
}

async function fetchGuessDistribution() {
    try {
        const response = await fetch('https://solitary-star-3b20.caoalexander9-25f.workers.dev/api/guess-distribution');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched guess distribution:', data);
        return data;
    } catch (error) {
        console.error('Error fetching guess distribution:', error);
    }
}

async function showGuessDistribution(videoLink) {
    const videoId = videoLink;
    const data = await fetchGuessDistribution();
    if (data) {
        let videoData = data.find(item => item.VideoId === videoId);
        if (!videoData) {
            console.error(`No distribution data found for video_id: ${videoId}`);
            videoData = {
                VideoId: videoId,
                Bronze: 0,
                Silver: 0,
                Gold: 0,
                Diamond: 0,
                Mythic: 0,
                Legendary: 0,
                MASTERS: 0
            };
            console.log(`Created new data for video_id: ${videoId}`);
        }
        else {
            console.log('Video data:', videoData);
        }

        const rankNames = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Mythic', 'Legendary', 'MASTERS'];
        const counts = rankNames.map(rank => {
            return videoData[rank] || 0;
        });

        const ctx = document.getElementById('guessDistributionChart').getContext('2d');
        console.log('Rendering chart with data:', { rankNames, counts });
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: rankNames,
                datasets: [{
                    label: 'Guess Distribution',
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
}

if (typeof Chart !== 'undefined') {
    console.log('Chart.js is loaded');
} else {
    console.error('Chart.js is not loaded');
}

function closeModal() {
    const modal = document.getElementById("rankModal");
    modal.style.display = "none";

     // Apply fade-out animation
     modal.style.animation = "fadeOut 0.3s ease-out forwards";
     modal.querySelector('.modal-content').style.animation = "slideOut 0.3s ease-out forwards";
     overlay.style.animation = "fadeOut 0.3s ease-out forwards";
 
     // Wait for the animation to complete before hiding the modal and overlay
     setTimeout(() => {
         modal.style.display = "none";
         overlay.style.display = "none";
         modal.style.animation = ""; // Reset animation
         modal.querySelector('.modal-content').style.animation = ""; // Reset animation
         overlay.style.animation = ""; // Reset animation
     }, 300);
}
/*
function updateTimer() {
    const timerElement = document.getElementById('timer');

    // Get the current time
    const now = new Date();

    // Set the reset time to 12 PM (noon) of the current day
    let resetTime = new Date(now);
    resetTime.setHours(12, 0, 0, 0); // 12 PM (noon) Standard Time

    // If it's already past 12 PM, set the reset time to 12 PM the next day
    if (now >= resetTime) {
      resetTime.setDate(resetTime.getDate() + 1);
    }

    // Calculate the time remaining until the next reset
    const timeRemaining = resetTime - now;

    if (timeRemaining <= 0) {
      onReset();
      resetTime.setDate(resetTime.getDate() + 1); // Update to the next day's reset
    }

    // Convert remaining time to hours, minutes, seconds
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Display the countdown
    timerElement.textContent = `Time until reset: ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  }
*/

document.addEventListener("DOMContentLoaded", () => { 
    if (document.getElementById("brawldle-daily")) {
        getVideoDaily();
    }
    if (document.getElementById("brawldle-unlimited")) {
        getRandomVideo();
    }
    if (document.getElementById("trophies-unlimited")) {
        getRandomTrophyVideo();
    }
    if (document.getElementById("leaderboard-content")) {
        fetchLeaderboard();
    }
    // getRandomVideo(); // Removed unconditional call causing errors on multiplayer page load
});
document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submitButton");
    if (submitBtn) updateSubmitButton();
    const trophyRange = document.getElementById("trophyRange");
    if (trophyRange) trophyRange.addEventListener("input", updateTrophyValue);
});

//updateTimer();
//setInterval(updateTimer, 1000);


// Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
    const modal = document.getElementById("rankModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function checkLogin() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Sign in or create an account to earn points! You can still play without an account.');
        return true;
    }
    return true;
}



function logout() {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
}

async function fetchLeaderboard() {
    const content = document.getElementById('leaderboard-content');
    
    try {
        const response = await fetch('https://mortipins-leaderboard.imenkei64.workers.dev/leaderboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Origin': window.location.origin,
                'Referer': window.location.href
            },
            credentials: 'same-origin'
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data:', data);

        if (data.success) {
            const table = createLeaderboardTable(data.data);
            content.innerHTML = '';
            content.appendChild(table);
        } else {
            content.innerHTML = `<div class="error">${data.error || 'Failed to fetch leaderboard data'}</div>`;
        }
    } catch (error) {
        console.error('Leaderboard error:', error);
        content.innerHTML = `<div class="error">Failed to connect to the leaderboard server: ${error.message}</div>`;
    }
}

function createLeaderboardTable(data) {
    const table = document.createElement('table');
    table.className = 'leaderboard-table';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th class="rank">Rank</th>
            <th class="username">Username</th>
            <th class="points">Points</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="rank">#${entry.rank}</td>
            <td class="username">${entry.username}</td>
            <td class="points">${entry.points.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    return table;
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("brawldle-multiplayer")) initMultiplayer();
});

function initMultiplayer() {
    console.log("CLIENT: initMultiplayer called");
    const matchmakingScreen = document.getElementById('matchmaking-section'); // Corrected ID
    const gameScreen = document.getElementById('multiplayer-game'); // Corrected ID
    // const statusMessage = document.getElementById('statusMessage'); // For matchmaking screen
    const mpStatus = document.getElementById('mp-status'); // For in-game status
    const matchmakingStatusMessage = document.querySelector('#matchmaking-section .loading p'); // More specific selector
    const cancelMatchmakingButton = document.getElementById('cancel-match');
    const checkStatusButton = document.getElementById('manual-check-lobby');

    if (!matchmakingScreen || !gameScreen || !matchmakingStatusMessage || !cancelMatchmakingButton || !checkStatusButton || !mpStatus) {
        console.error("CLIENT: One or more multiplayer UI elements are missing from the DOM for initMultiplayer.");
        if (matchmakingStatusMessage) matchmakingStatusMessage.textContent = "Error: UI elements missing. Cannot start multiplayer.";
        return;
    }
    
    matchmakingScreen.style.display = 'flex'; // Assuming flex for centering
    gameScreen.style.display = 'none';
    if (matchmakingStatusMessage) matchmakingStatusMessage.textContent = 'Looking for a player...';
    checkStatusButton.style.display = 'inline-block';
    cancelMatchmakingButton.style.display = 'inline-block';

    // Reset multiplayer state for a new session
    multiplayerLobbyId = null;
    if (pollIntervalId) clearInterval(pollIntervalId);
    pollIntervalId = null;
    if (clipTimerIntervalId) clearInterval(clipTimerIntervalId);
    clipTimerIntervalId = null;

    multiplayerVideoQueue = [];
    currentMultiplayerClipIndex = 0;
    currentMultiplayerClipNumberForDisplay = 1;
    playerOneName = '';
    playerTwoName = '';
    currentPlayerRole = null;
    
    multiplayerPlayerId = localStorage.getItem('multiplayerPlayerId');
    if (!multiplayerPlayerId) {
        multiplayerPlayerId = `player_${Math.random().toString(36).substring(2, 11)}`;
        localStorage.setItem('multiplayerPlayerId', multiplayerPlayerId);
    }
    console.log("CLIENT: Using Player ID:", multiplayerPlayerId);

    fetch(`${WORKER_URL}/matchmaking/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player: multiplayerPlayerId })
    })
    .then(response => {
        console.log("CLIENT: Join request response status:", response.status);
        if (!response.ok) {
            return response.json().catch(() => ({error: `Failed to join lobby. Status: ${response.status}`}))
                .then(errorData => { throw new Error(errorData.error || `HTTP error ${response.status}`); });
        }
        return response.json();
    })
    .then(data => {
        console.log("CLIENT: Join response data:", data);
        if (data.error) {
            console.error("CLIENT: Error from join:", data.error);
            if (matchmakingStatusMessage) matchmakingStatusMessage.textContent = `Error: ${data.error}`;
            checkStatusButton.style.display = 'inline-block';
            return;
        }

        if (!data.lobby_id) {
            console.error("CLIENT: CRITICAL - lobby_id missing from join response. Data:", data);
            if (matchmakingStatusMessage) matchmakingStatusMessage.textContent = "Error: Lobby ID not received. Try checking status or refresh.";
            checkStatusButton.style.display = 'inline-block';
            return;
        }
        
        multiplayerLobbyId = data.lobby_id;
        localStorage.setItem('multiplayerLobbyId', multiplayerLobbyId);
        console.log("CLIENT: Joined/Created lobby. Lobby ID:", multiplayerLobbyId, "Initial server status:", data.status);
        
        // Immediately poll for full status which includes videos and player roles.
        pollLobbyStatus(); 
        startPollingLobbyStatus(); // Start continuous polling

    })
    .catch(error => {
        console.error("CLIENT: Error during initMultiplayer fetch:", error);
        if (matchmakingStatusMessage) matchmakingStatusMessage.textContent = `Connection error: ${error.message}. Try again.`;
        checkStatusButton.style.display = 'inline-block';
    });

    if (checkStatusButton) {
        checkStatusButton.onclick = () => {
            if (multiplayerLobbyId) {
                console.log("CLIENT: Manual 'Check Status' button clicked.");
                if (matchmakingStatusMessage) matchmakingStatusMessage.textContent = "Checking status...";
                pollLobbyStatus();
            } else {
                 if (matchmakingStatusMessage) matchmakingStatusMessage.textContent = "Not in a lobby. Trying to rejoin...";
                initMultiplayer(); // Re-initialize if no lobby_id
            }
        };
    }

    if (cancelMatchmakingButton) {
        cancelMatchmakingButton.onclick = () => {
            console.log("CLIENT: Cancel matchmaking clicked.");
            if (pollIntervalId) clearInterval(pollIntervalId);
            if (clipTimerIntervalId) clearInterval(clipTimerIntervalId);
            if (multiplayerLobbyId) {
                fetch(`${WORKER_URL}/matchmaking/leave`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ lobby_id: multiplayerLobbyId, player_id: multiplayerPlayerId })
                })
                .then(() => console.log("CLIENT: Sent leave request for lobby", multiplayerLobbyId))
                .catch(err => console.error("CLIENT: Error leaving lobby:", err))
                .finally(() => {
                    window.location.href = "brawldle.html";
                });
            } else {
                window.location.href = "brawldle.html";
            }
        };
    }
}

function startPollingLobbyStatus() {
    if (pollIntervalId) clearInterval(pollIntervalId);
    console.log("CLIENT: Starting lobby status polling for lobby_id:", multiplayerLobbyId);
    // Poll slightly more frequently during active gameplay for responsiveness
    const pollRate = document.getElementById('multiplayer-game').style.display === 'block' ? 2000 : 3000;
    pollIntervalId = setInterval(pollLobbyStatus, pollRate);
    // pollLobbyStatus(); // Initial check is now handled in initMultiplayer's .then()
}

async function pollLobbyStatus() {
    const matchmakingStatusMessage = document.querySelector('#matchmaking-section .loading p');
    const checkStatusButton = document.getElementById('manual-check-lobby');
    const mpStatus = document.getElementById('mp-status'); // In-game status message

    if (!multiplayerLobbyId) {
        console.log("CLIENT: No lobby ID to poll status for. Stopping poll.");
        if (pollIntervalId) clearInterval(pollIntervalId);
        const ms_exists_1 = document.getElementById('matchmaking-section');
        if (matchmakingStatusMessage && ms_exists_1 && ms_exists_1.style.display !== 'none') {
            matchmakingStatusMessage.textContent = "Not in a lobby. Try joining again.";
        }
        if (checkStatusButton) checkStatusButton.style.display = 'inline-block';
        return;
    }

    console.log("CLIENT: Polling status for lobby_id:", multiplayerLobbyId);
    try {
        const response = await fetch(`${WORKER_URL}/matchmaking/status?lobby_id=${multiplayerLobbyId}`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("CLIENT: Error checking lobby status:", response.status, errorText);
            const ms_exists_2 = document.getElementById('matchmaking-section');
            if (ms_exists_2 && ms_exists_2.style.display !== 'none' && matchmakingStatusMessage) {
                 matchmakingStatusMessage.textContent = `Error: Could not check lobby status (${response.status}).`;
            } else if (mpStatus) {
                 mpStatus.textContent = `Error: Could not check lobby status (${response.status}).`;
            }
            if (response.status === 404) {
                 if (pollIntervalId) clearInterval(pollIntervalId);
                 if (matchmakingStatusMessage) matchmakingStatusMessage.textContent = "Lobby not found. It might have expired.";
                 if (mpStatus) mpStatus.textContent = "Lobby not found. Match ended.";
                 if (checkStatusButton) checkStatusButton.style.display = 'none';
                 document.getElementById('cancel-match').textContent = "Go Back";
            }
            return;
        }
        const data = await response.json();
        console.log("CLIENT: Lobby status data:", data);

        if (data.error) {
            console.error("CLIENT: Error from lobby status:", data.error);
            const ms_exists_3 = document.getElementById('matchmaking-section');
            if (matchmakingStatusMessage && ms_exists_3 && ms_exists_3.style.display !== 'none') {
                 matchmakingStatusMessage.textContent = `Error: ${data.error}`;
            } else if (mpStatus) {
                 mpStatus.textContent = `Error: ${data.error}`;
            }
            // if (pollIntervalId) clearInterval(pollIntervalId); // Decide if fatal
            return;
        }
        
        playerOneName = data.player_one;
        playerTwoName = data.player_two;

        // Determine player role if not set yet
        if (!currentPlayerRole && data.player_one && data.player_two) {
            if (multiplayerPlayerId === data.player_one) currentPlayerRole = 'p1';
            else if (multiplayerPlayerId === data.player_two) currentPlayerRole = 'p2';
            console.log("CLIENT: Determined currentPlayerRole:", currentPlayerRole);
        }

        const gameScreenElement = document.getElementById('multiplayer-game');
        const gameScreenActive = gameScreenElement && gameScreenElement.style.display === 'block';

        if (data.status === 'ready' && data.player_one && data.player_two) {
            if (!gameScreenActive) { // Game is ready to start
                if (matchmakingStatusMessage) matchmakingStatusMessage.textContent = 'Both players ready! Starting game...';
                if (checkStatusButton) checkStatusButton.style.display = 'none';
                
                if (data.videos && data.videos.length === 5) {
                    multiplayerVideoQueue = data.videos;
                    console.log("CLIENT: Received video queue from server:", multiplayerVideoQueue);
                    startGame(); // This will switch screens and start polling for game progress
                } else {
                    console.error("CLIENT: Video queue not received or incomplete. Data:", data);
                    if (matchmakingStatusMessage) matchmakingStatusMessage.textContent = "Error: Video list missing. Try refreshing.";
                }
            } else { // Game is already in progress, handle progression
                const serverClipNumber = data.current_clip_number; // 1-indexed
                const clientDisplayClipNumber = currentMultiplayerClipNumberForDisplay; // 1-indexed

                console.log(`CLIENT: Game in progress. Server clip: ${serverClipNumber}, Client expecting: ${clientDisplayClipNumber}`);
                console.log("CLIENT: All guesses from server:", data.guesses);


                if (serverClipNumber > 5) { // Game finished based on server
                    console.log("CLIENT: Server indicates game is over (clip > 5). Finishing match.");
                    if (pollIntervalId) clearInterval(pollIntervalId);
                    if (clipTimerIntervalId) clearInterval(clipTimerIntervalId);
                    finishMatch();
                    return;
                }
                
                // Check if client needs to advance to the server's current clip
                if (clientDisplayClipNumber < serverClipNumber) {
                    console.log(`CLIENT: Advancing to clip ${serverClipNumber}.`);
                    currentMultiplayerClipIndex = serverClipNumber - 1;
                    currentMultiplayerClipNumberForDisplay = serverClipNumber;
                    updateClipUI(); // Load new clip, enable buttons
                    startClipTimer(); // Restart timer for the new clip
                    if (mpStatus) mpStatus.textContent = "Guess the rank!";
                } else if (clientDisplayClipNumber === serverClipNumber) {
                    // On the correct clip, check submission status
                    const currentClipGuesses = data.guesses[`clip${serverClipNumber}`];
                    let ownGuessSubmitted = false;
                    if (currentClipGuesses) {
                        if (currentPlayerRole === 'p1' && currentClipGuesses.p1) ownGuessSubmitted = true;
                        if (currentPlayerRole === 'p2' && currentClipGuesses.p2) ownGuessSubmitted = true;
                    }

                    if (ownGuessSubmitted) {
                        if (mpStatus) mpStatus.textContent = "Guess submitted! Waiting for opponent...";
                        document.querySelectorAll('.rank-buttons img').forEach(btn => btn.style.pointerEvents = 'none'); // Disable rank buttons visually/behaviorally
                        const submitBtn = document.querySelector('#multiplayer-game .submit-button');
                        if (submitBtn) submitBtn.classList.add('disabled');
                    } else {
                        if (mpStatus) mpStatus.textContent = "Guess the rank!";
                        // Ensure buttons are enabled if not submitted
                        document.querySelectorAll('.rank-buttons img').forEach(btn => btn.style.pointerEvents = 'auto');
                         const submitBtn = document.querySelector('#multiplayer-game .submit-button');
                        if (submitBtn) submitBtn.classList.remove('disabled'); // Assuming selectedRankName check handles actual enable/disable
                        updateSubmitButtonStateMultiplayer();
                    }
                } else { // clientDisplayClipNumber > serverClipNumber - should not happen
                    console.warn(`CLIENT: Client is ahead of server clip. Client: ${clientDisplayClipNumber}, Server: ${serverClipNumber}. Waiting for server.`);
                     if (mpStatus) mpStatus.textContent = "Waiting for server to catch up...";
                }
            }
        } else if (data.status === 'waiting_for_player_two' && data.player_one) {
            const ms_exists_4 = document.getElementById('matchmaking-section');
            if (matchmakingStatusMessage && ms_exists_4 && ms_exists_4.style.display !== 'none') matchmakingStatusMessage.textContent = '1 Player in lobby. Waiting for another player...';
            console.log("CLIENT: Waiting for another player. Player one:", data.player_one);
        } else { // Initial 'waiting' or other states
            const ms_exists_5 = document.getElementById('matchmaking-section');
            if (matchmakingStatusMessage && ms_exists_5 && ms_exists_5.style.display !== 'none') {
                 matchmakingStatusMessage.textContent = 'Waiting for player...';
            }
            console.log("CLIENT: Still waiting or unexpected status:", data.status);
        }
    } catch (error) {
        console.error("CLIENT: Error in pollLobbyStatus fetch:", error);
        const ms_exists_6 = document.getElementById('matchmaking-section');
         if (matchmakingStatusMessage && ms_exists_6 && ms_exists_6.style.display !== 'none') {
            matchmakingStatusMessage.textContent = 'Network error checking status. Retrying...';
        } else if (mpStatus) {
            mpStatus.textContent = 'Network error. Retrying...';
        }
    }
}


function startGame() { // Multiplayer context
    console.log("CLIENT: startGame (multiplayer) function called");
    const matchmakingScreen = document.getElementById('matchmaking-section');
    const gameScreen = document.getElementById('multiplayer-game'); // Ensure correct ID
    const cancelMatchmakingButton = document.getElementById('cancel-match');
    const checkStatusButton = document.getElementById('manual-check-lobby');
    const mpStatus = document.getElementById('mp-status');


    if (matchmakingScreen) matchmakingScreen.style.display = 'none';
    if (gameScreen) gameScreen.style.display = 'block'; // Or 'flex' if layout requires
    if (cancelMatchmakingButton) cancelMatchmakingButton.style.display = 'none';
    if (checkStatusButton) checkStatusButton.style.display = 'none';
    

    currentMultiplayerClipIndex = 0; 
    currentMultiplayerClipNumberForDisplay = 1;
    
    console.log("CLIENT: Multiplayer game starting. Video queue:", multiplayerVideoQueue);
    if (multiplayerVideoQueue.length > 0) {
        updateClipUI(); 
        startClipTimer();
        if (mpStatus) mpStatus.textContent = "Guess the rank!"; // Initial status for first clip
        if (!pollIntervalId) { // Ensure polling is running if not already
            startPollingLobbyStatus();
        }
    } else {
        console.error("CLIENT: Cannot start game, multiplayerVideoQueue is empty.");
        if (matchmakingScreen) matchmakingScreen.style.display = 'flex';
        if (gameScreen) gameScreen.style.display = 'none';
        const matchmakingStatusMessage = document.querySelector('#matchmaking-section .loading p');
        if (matchmakingStatusMessage) matchmakingStatusMessage.textContent = "Error starting game: No videos. Please try again.";
        if (checkStatusButton) checkStatusButton.style.display = 'inline-block';
        if (cancelMatchmakingButton) cancelMatchmakingButton.style.display = 'inline-block';
    }
}

function updateClipUI() { // Primarily for multiplayer
    const videoFrame = document.getElementById("videoFrame");
    const gameCountDisplay = document.getElementById("gameCount"); 
    const rankDisplay = document.getElementById("rankDisplay"); // Should be hidden in MP
    const mpStatus = document.getElementById('mp-status');
    const submitButton = document.querySelector('#multiplayer-game .submit-button');


    if (!videoFrame || !gameCountDisplay || !mpStatus || !submitButton) {
        console.error("CLIENT: One or more UI elements missing in updateClipUI for multiplayer.");
        return;
    }
    
    console.log("CLIENT: updateClipUI for multiplayer. New Clip Index:", currentMultiplayerClipIndex, "Display Number:", currentMultiplayerClipNumberForDisplay);
    
    if (multiplayerVideoQueue.length > 0 && currentMultiplayerClipIndex < multiplayerVideoQueue.length) {
        videoFrame.src = multiplayerVideoQueue[currentMultiplayerClipIndex];
        console.log("CLIENT: Loading multiplayer video:", multiplayerVideoQueue[currentMultiplayerClipIndex]);
        gameCountDisplay.textContent = `Clip ${currentMultiplayerClipNumberForDisplay} of ${multiplayerVideoQueue.length}`;
        
        if (rankDisplay) rankDisplay.style.display = 'none'; 
        
        // Reset for new clip
        selectedRank = null; 
        selectedRankName = null;
        document.querySelectorAll('.rank-buttons img').forEach(button => {
            button.classList.remove('selected');
            button.style.pointerEvents = 'auto'; // Re-enable interaction
        });
        submitButton.classList.add('disabled'); // Disable until rank selected
        mpStatus.textContent = "Guess the rank!"; // Default status for new clip
        updateSubmitButtonStateMultiplayer();


    } else {
        console.error("CLIENT: Invalid multiplayer clip index or empty queue. Index:", currentMultiplayerClipIndex, "Queue length:", multiplayerVideoQueue.length);
        gameCountDisplay.textContent = "Error loading clip.";
        mpStatus.textContent = "Error loading clip. Match may end.";
        // Game should end via pollLobbyStatus if server indicates > 5 clips or error
    }
}

function updateSubmitButtonStateMultiplayer() {
    const submitButton = document.querySelector('#multiplayer-game .submit-button');
    if (!submitButton) return;

    if (selectedRankName) {
        submitButton.classList.remove('disabled');
    } else {
        submitButton.classList.add('disabled');
    }
}


// Modify selectRank to also update the submit button state for multiplayer
function selectRank(rank) { // This function is used by both single and multiplayer
    selectedRank = rank;
    selectedRankName = rankNames[rank- 1];
    const buttons = document.querySelectorAll('.rank-buttons img');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });
    buttons[rank - 1].classList.add('selected');
    
    if (document.getElementById('brawldle-multiplayer')) {
        updateSubmitButtonStateMultiplayer();
    } else if (document.getElementById('brawldle-unlimited')) {
        // For unlimited, the submit button might be different or handled by submitGuess directly
        // For now, assume no specific update needed here, or it's handled by a general updateSubmitButton()
    } else if (document.getElementById('brawldle-daily')) {
        // Daily brawldle, similar to unlimited.
    }

    // Record the guess (this was for single player, might not be needed if not using this array for MP directly)
    // videoLinks[currentVideoIndex].guesses.push(selectedRankName); 
}


function startClipTimer() {
    if (clipTimerIntervalId) clearInterval(clipTimerIntervalId); // Clear existing timer
    let time = 30; 
    const timerDisplay = document.getElementById("timer");
    const mpStatus = document.getElementById('mp-status');

    if (!timerDisplay) {
        console.error("CLIENT: Timer display element not found.");
        return;
    }
    timerDisplay.textContent = `0:${time}`;

    clipTimerIntervalId = setInterval(() => {
        time--;
        if (timerDisplay) timerDisplay.textContent = `0:${time < 10 ? '0' : ''}${time}`;
        
        if (time < 0) { // Use < 0 to allow 0:00 to display briefly
            clearInterval(clipTimerIntervalId);
            if (window.location.pathname.includes('brawldle-multiplayer.html')) {
                if (mpStatus) mpStatus.textContent = "Time's up!";
                console.log("CLIENT: Clip timer ended for multiplayer.");
                // Do not auto-submit. Player might still click. pollLobbyStatus handles progression.
                // We could disable submission here if desired:
                // document.querySelector('#multiplayer-game .submit-button').classList.add('disabled');
                // document.querySelectorAll('.rank-buttons img').forEach(btn => btn.style.pointerEvents = 'none');
            } else {
                // submitGuess(); // Auto-submit for single player modes if desired
            }
        }
    }, 1000);
}

async function submitMultiplayerGuess() {
    console.log("CLIENT: submitMultiplayerGuess called");
    const mpStatus = document.getElementById('mp-status');

    if (!selectedRankName) { // Use the global selectedRankName set by selectRank
        if (mpStatus) mpStatus.textContent = "Please select a rank!";
        return;
    }

    if (!multiplayerLobbyId || !multiplayerPlayerId) {
        console.error("CLIENT: Missing lobbyId or playerId for submitting guess.");
        if (mpStatus) mpStatus.textContent = "Error: Not connected to a lobby.";
        return;
    }
    
    const submitButton = document.querySelector('#multiplayer-game .submit-button');
    document.querySelectorAll('.rank-buttons img').forEach(btn => btn.style.pointerEvents = 'none');
    if (submitButton) submitButton.classList.add('disabled');
    
    if (mpStatus) mpStatus.textContent = "Submitting guess...";

    try {
        const response = await fetch(`${WORKER_URL}/matchmaking/clip`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lobby_id: multiplayerLobbyId,
                clip_number: currentMultiplayerClipNumberForDisplay, // Client sends 1-indexed
                player_id: multiplayerPlayerId,
                guess: selectedRankName 
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Unknown error submitting guess" }));
            console.error("CLIENT: Error submitting multiplayer guess to worker:", response.status, errorData);
            if (mpStatus) mpStatus.textContent = `Error submitting: ${errorData.error}. Try again.`;
            // Re-enable buttons on error for retry
            document.querySelectorAll('.rank-buttons img').forEach(btn => btn.style.pointerEvents = 'auto');
            if (submitButton) updateSubmitButtonStateMultiplayer(); // Re-evaluates based on selectedRankName
            return;
        }
        console.log(`CLIENT: Guess for clip ${currentMultiplayerClipNumberForDisplay} (${selectedRankName}) submitted by ${multiplayerPlayerId}`);
        if (mpStatus) mpStatus.textContent = "Guess submitted! Waiting for other player...";
        
        // Immediately poll status to reflect own submission and potentially advance game
        pollLobbyStatus();

    } catch (error) {
        console.error("CLIENT: Error in submitMultiplayerGuess's fetch operation:", error);
        if (mpStatus) mpStatus.textContent = "Network error submitting guess. Please try again.";
        document.querySelectorAll('.rank-buttons img').forEach(btn => btn.style.pointerEvents = 'auto');
        if (submitButton) updateSubmitButtonStateMultiplayer();
    }
}

async function finishMatch() {
    console.log("CLIENT: finishMatch called for lobby:", multiplayerLobbyId);
    if (pollIntervalId) clearInterval(pollIntervalId);
    if (clipTimerIntervalId) clearInterval(clipTimerIntervalId);
    const mpStatus = document.getElementById('mp-status');
    if(mpStatus) mpStatus.textContent = "Game over! Calculating results...";

    // The worker's /finish endpoint now calculates and stores the winner.
    // We can optionally use the scores from its response if needed here,
    // but the primary action is redirection.
    fetch(`${WORKER_URL}/matchmaking/finish`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({lobby_id: multiplayerLobbyId})
    })
    .then(r => {
        if (!r.ok) {
            console.error("CLIENT: Error finalizing match on server:", r.status);
            // Even if server finish fails, try to go to results page.
        }
        return r.json();
    })
    .then(data => {
        console.log("CLIENT: Finish match response from server:", data);
        window.location.href = `brawldle-multiplayer-results.html?lobby_id=${multiplayerLobbyId}`;
    })
    .catch(err => {
        console.error("CLIENT: Error in finishMatch fetch:", err);
        // Fallback redirect even on error
        window.location.href = `brawldle-multiplayer-results.html?lobby_id=${multiplayerLobbyId}`;
    });
}
