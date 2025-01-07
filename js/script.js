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
    { link: "https://www.youtube.com/embed/L99aHF0C_8c", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/MH1YnfTBF6I", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/hk7BTKrno0k", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/oGil41Nt7ZM", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/gvdweIU9m3c", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/0gwz5qJs4UA", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/OAP4UgMWhjI", trueRank: "Mythic", guesses: [] },
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
    { link: "https://www.youtube.com/embed/K8iLdlhpTJE", trueRank: "Mythic", guesses: [] },
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
    { link: "https://www.youtube.com/embed/0AXVCmfWtuE", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/0AXVCmfWtuE", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/I4yUuEng6Ss", trueRank: "Bronze", guesses: [] },
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
    { link: "https://www.youtube.com/embed/dQw4w9WgXcQ", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/Uq37V_N7VB8", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/WaKFkDs6uUc", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Qwhs0bA-bhw", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/Diikb5VTVz0", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/8ODyf91sgqE", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/qvdgMBFnpPw", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/J4Cu2B4JybY", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/dQw4w9WgXcQ", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/LTYgmxyHcZg", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/Ay2dS6kshWA", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/XqDCeLydkhI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/62_d3v5YNx0", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/kQRrHBP-veo", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/3MA9uzJVvGI", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/C0_OqjSocvA", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/_s8LetmVB8E", trueRank: "Masters", guesses: [] },
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
    { link: "https://www.youtube.com/embed/_s8LetmVB8E", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/XTUnnIN0KG4", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/Mnn0g-orGHc", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/LTAQqRrSh94", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/j27YKvLKlXI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Dha7t8gnYe4", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/d69r2XjHe94", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/Rl6JiWFd5Z8", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/LQyU9QCH-vE", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/lZRrKYtmrZ0", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/_s8LetmVB8E", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/aU-8mt4t08E", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/u_4qGc4TwIs", trueRank: "Silver", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/LmLFWlHCPko", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/oJtsKjF78DQ", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/Ye5DTeuOknc", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Xe3AuIcudVg", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/Xe3AuIcudVg", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/9vBXQAc8Gu4", trueRank: "Bronze", guesses: [] },
    { link: "https://www.youtube.com/embed/fc_7Deq4oyw", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/_s8LetmVB8E", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/us--hJmbmBk", trueRank: "Bronze", guesses: [] },
    { link: "https://www.youtube.com/embed/_s8LetmVB8E", trueRank: "Masters", guesses: [] },
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
    { link: "https://www.youtube.com/embed/_s8LetmVB8E", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/mrLl2hsDKE0", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/z8idXBnsKkM", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/pBY5p_wNSU4", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/idQCHfNdsJs", trueRank: "Bronze", guesses: [] },
    { link: "https://www.youtube.com/embed/XT4MkBLlAog", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/xJV38Had9uA", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/1P1V26UP114", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/N8RTl28QCYw", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/nJjNkNX6bdk", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/xmgYR12sIJ4", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/8CBCAtUMZPc", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/8CBCAtUMZPc", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/8CBCAtUMZPc", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/T4e-1sgkkDA", trueRank: "Bronze", guesses: [] },
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
    { link: "https://www.youtube.com/embed/r_gvCdVwGgY", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/fBhCJhpO1Dw", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/qCC3nGOTIiE", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/2ukmInNJ3R4", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/AwnpLM63pH8", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/XiLu-UEhcFQ", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/Ayj-yzgMnlA", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/u_4qGc4TwIs", trueRank: "Silver", guesses: [] },
    { link: "https://www.youtube.com/embed/mLx83oQLRoc", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/_U-MF4PUd7c", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/_U-MF4PUd7c", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/_U-MF4PUd7c", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/_U-MF4PUd7c", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/NG3YvfnoOYM", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/S-6j11KWkkU", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/ersaWEt4Vuc", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/ersaWEt4Vuc", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/8-eT1MTELpc", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/ksHuXONEtuI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/4MD8nuX39es", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/4MD8nuX39es", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/8AxzOwwxNsI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/x-o1gFA9LrI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/LViQBR_CiCw", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/LViQBR_CiCw", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/HLWHpHkWuy8", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/tqMVBoUZ-Us", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/6PIAg_PKnk0", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/2jTkzaf1ymw", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/IJOcgZej8Nc", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/eikRuhoft_0", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/Vb9WeKROv40", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/t4BRifXPGGA", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/iw_dGyd3ZVo", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/OXnmtUPUitQ", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/0uOLwzlG3-Y", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/ryQI9JEcLGc", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/Pmr7xdeWxsM", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/Pmr7xdeWxsM", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/A0Sbw7_QB24", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/AFXSw1lRRco", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/gSZl6CZ2BaQ", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/5czwWqBgSMw", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/74512832763", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/LTYgmxyHcZg", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/ODjO2bn-bvU", trueRank: "Silver", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/RPepxKvmLgw", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/KlNSyZYj4hk", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/W9VOpoqdR2E", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/W9VOpoqdR2E", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/kkmknDH18f8", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/uKGPNwsqyZA", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/OyM9xeZTfx4", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/Q3sOpnXO8iQ", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/djFFOWeYwTQ", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/X4l6wFtgLQc", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/L2imYBNEHRA", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/eFfvP8-XjVg", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/w94evy4B-AY", trueRank: "Bronze", guesses: [] },
    { link: "https://www.youtube.com/embed/m7jhi4uj-no", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/J2xif3YXB1c", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/OVOYLgQfsc4", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/Cbqk2EsjHgU", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/k02c08f1tDc", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/mV162rf_Dy8", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/Qx_zDRVVUvQ", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/RW9jdSiYq1g", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/py3hoX29pBc", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/rI3IJBxpQuU", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/ae0HzlL-GL8", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/8Ym9P_1h4OQ", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/v3rfOVCx_Bk", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/v3rfOVCx_Bk", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/v3rfOVCx_Bk", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/v3rfOVCx_Bk", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/j_WLSHgvPMI", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/Cb68u2DcS-M", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/-Iuq2b3_CiY", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/5rNmNOCimzo", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/3CTb92Va_I8", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/NkqQZyVYJzE", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/lqDzn2YOPwE", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/088yEyM4KRu", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/0c0gTRF6Q7W", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/Zf4yyFfLJGw", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/dhvyuz8KKZw", trueRank: "Bronze", guesses: [] },
    { link: "https://www.youtube.com/embed/4Z77VhLQ2II", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/oj9bpzrmEP8", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/VAd_w1N5ctI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/-Bvw2pZEsok", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/dQw4w9WgXcQ", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/QUqzbZnFYa0", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/HXuFDFntEBY", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/3t21jlBaI28", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/YQ2qYuL7Yik", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/d1A50HSv-JY", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/d1A50HSv-JY", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/0u_tLZapATI", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/kW6R7a548lY", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/8rPrsHypK1E", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/fOzL2M-Rs1M", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/ZKkrBi6fbDw", trueRank: "Gold", guesses: [] },
    { link: "https://www.youtube.com/embed/lslQSk5M2cI", trueRank: "Legendary", guesses: [] },
    { link: "https://www.youtube.com/embed/awUls0cfWpE", trueRank: "Masters", guesses: [] },
    { link: "https://www.youtube.com/embed/JxZQMNnI03w", trueRank: "Diamond", guesses: [] },
    { link: "https://www.youtube.com/embed/bQM5L0N05qc", trueRank: "Mythic", guesses: [] },
    { link: "https://www.youtube.com/embed/qstQ7XxNvwY", trueRank: "Masters", guesses: [] },
];

const videoTrophyLinks = [
    { link: "https://www.youtube.com/embed/-1EsK0iNE_8", trueTrophy: "38000", guesses: [] },
    { link: "https://www.youtube.com/embed/OHNIK5hY884", trueTrophy: "32000", guesses: [] },
    { link: "https://www.youtube.com/embed/dQw4w9WgXcQ", trueTrophy: "87000", guesses: [] },
    { link: "https://www.youtube.com/embed/Uq37V_N7VB8", trueTrophy: "90000", guesses: [] },
    { link: "https://www.youtube.com/embed/WaKFkDs6uUc", trueTrophy: "75000", guesses: [] },
    { link: "https://www.youtube.com/embed/Qwhs0bA-bhw", trueTrophy: "70000", guesses: [] },
    { link: "https://www.youtube.com/embed/Diikb5VTVz0", trueTrophy: "25000", guesses: [] },
    { link: "https://www.youtube.com/embed/8ODyf91sgqE", trueTrophy: "57000", guesses: [] },
    { link: "https://www.youtube.com/embed/qvdgMBFnpPw", trueTrophy: "32000", guesses: [] },
    { link: "https://www.youtube.com/embed/J4Cu2B4JybY", trueTrophy: "22000", guesses: [] },
    { link: "https://www.youtube.com/embed/dQw4w9WgXcQ", trueTrophy: "100000", guesses: [] },
    { link: "https://www.youtube.com/embed/LTYgmxyHcZg", trueTrophy: "140000", guesses: [] },
    { link: "https://www.youtube.com/embed/Ay2dS6kshWA", trueTrophy: "25691", guesses: [] },
    { link: "https://www.youtube.com/embed/kQRrHBP-veo", trueTrophy: "48000", guesses: [] },
    { link: "https://www.youtube.com/embed/3MA9uzJVvGI", trueTrophy: "42000", guesses: [] },
    { link: "https://www.youtube.com/embed/C0_OqjSocvA", trueTrophy: "38200", guesses: [] },
    { link: "https://www.youtube.com/embed/_s8LetmVB8E", trueTrophy: "111111", guesses: [] },
    { link: "https://www.youtube.com/embed/yaFfh3DZZtE", trueTrophy: "43000", guesses: [] },
    { link: "https://www.youtube.com/embed/IbLjFyxVRWo", trueTrophy: "23757", guesses: [] },
    { link: "https://www.youtube.com/embed/mTc3O1smvRU", trueTrophy: "47094", guesses: [] },
    { link: "https://www.youtube.com/embed/--8Ph4IB46Q", trueTrophy: "26083", guesses: [] },
    { link: "https://www.youtube.com/embed/-1EsK0iNE_8", trueTrophy: "38000", guesses: [] },
    { link: "https://www.youtube.com/embed/d3zpHzyF6d0", trueTrophy: "40000", guesses: [] },
    { link: "https://www.youtube.com/embed/Ff5P6XanTQk", trueTrophy: "28000", guesses: [] },
    { link: "https://www.youtube.com/embed/CUrbZ0Gny34", trueTrophy: "39000", guesses: [] },
    { link: "https://www.youtube.com/embed/zTLw9wFIlF0", trueTrophy: "17132", guesses: [] },
    { link: "https://www.youtube.com/embed/7ZH9DXWgIZA", trueTrophy: "55000", guesses: [] },
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
    { link: "https://www.youtube.com/embed/_s8LetmVB8E", trueTrophy: "45000", guesses: [] },
    { link: "https://www.youtube.com/embed/XTUnnIN0KG4", trueTrophy: "20771", guesses: [] },
    { link: "https://www.youtube.com/embed/Mnn0g-orGHc", trueTrophy: "15000", guesses: [] },
    { link: "https://www.youtube.com/embed/j27YKvLKlXI", trueTrophy: "31256", guesses: [] },
    { link: "https://www.youtube.com/embed/Dha7t8gnYe4", trueTrophy: "12000", guesses: [] },
    { link: "https://www.youtube.com/embed/d69r2XjHe94", trueTrophy: "62454", guesses: [] },
    { link: "https://www.youtube.com/embed/Rl6JiWFd5Z8", trueTrophy: "24485", guesses: [] },
    { link: "https://www.youtube.com/embed/LQyU9QCH-vE", trueTrophy: "63000", guesses: [] },
    { link: "https://www.youtube.com/embed/lZRrKYtmrZ0", trueTrophy: "63000", guesses: [] },
    { link: "https://www.youtube.com/embed/_s8LetmVB8E", trueTrophy: "73000", guesses: [] },
    { link: "https://www.youtube.com/embed/aU-8mt4t08E", trueTrophy: "40790", guesses: [] },
    { link: "https://www.youtube.com/embed/u_4qGc4TwIs", trueTrophy: "8712", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueTrophy: "24000", guesses: [] },
    { link: "https://www.youtube.com/embed/LmLFWlHCPko", trueTrophy: "45000", guesses: [] },
    { link: "https://www.youtube.com/embed/oJtsKjF78DQ", trueTrophy: "45000", guesses: [] },
    { link: "https://www.youtube.com/embed/Ye5DTeuOknc", trueTrophy: "45000", guesses: [] },
    { link: "https://www.youtube.com/embed/Xe3AuIcudVg", trueTrophy: "89000", guesses: [] },
    { link: "https://www.youtube.com/embed/Xe3AuIcudVg", trueTrophy: "78000", guesses: [] },
    { link: "https://www.youtube.com/embed/9vBXQAc8Gu4", trueTrophy: "39000", guesses: [] },
    { link: "https://www.youtube.com/embed/fc_7Deq4oyw", trueTrophy: "40468", guesses: [] },
    { link: "https://www.youtube.com/embed/_s8LetmVB8E", trueTrophy: "30129", guesses: [] },
    { link: "https://www.youtube.com/embed/us--hJmbmBk", trueTrophy: "5976", guesses: [] },
    { link: "https://www.youtube.com/embed/_s8LetmVB8E", trueTrophy: "67890", guesses: [] },
    { link: "https://www.youtube.com/embed/iN5Pm6RCuU0", trueTrophy: "7000", guesses: [] },
    { link: "https://www.youtube.com/embed/I3MUY-cZZwc", trueTrophy: "98000", guesses: [] },
    { link: "https://www.youtube.com/embed/Fjt46na_LGA", trueTrophy: "33611", guesses: [] },
    { link: "https://www.youtube.com/embed/MqhIpLk58tE", trueTrophy: "20000", guesses: [] },
    { link: "https://www.youtube.com/embed/Z8eCP859K9s", trueTrophy: "36000", guesses: [] },
    { link: "https://www.youtube.com/embed/N0rr7BxAap4", trueTrophy: "36000", guesses: [] },
    { link: "https://www.youtube.com/embed/NG61SAV-_CY", trueTrophy: "26500", guesses: [] },
    { link: "https://www.youtube.com/embed/UrElWiG6weQ", trueTrophy: "39100", guesses: [] },
    { link: "https://www.youtube.com/embed/_T0kQJnjtn4", trueTrophy: "11111", guesses: [] },
    { link: "https://www.youtube.com/embed/_s8LetmVB8E", trueTrophy: "21374", guesses: [] },
    { link: "https://www.youtube.com/embed/mrLl2hsDKE0", trueTrophy: "29000", guesses: [] },
    { link: "https://www.youtube.com/embed/z8idXBnsKkM", trueTrophy: "62738", guesses: [] },
    { link: "https://www.youtube.com/embed/pBY5p_wNSU4", trueTrophy: "18665", guesses: [] },
    { link: "https://www.youtube.com/embed/idQCHfNdsJs", trueTrophy: "50000", guesses: [] },
    { link: "https://www.youtube.com/embed/XT4MkBLlAog", trueTrophy: "75000", guesses: [] },
    { link: "https://www.youtube.com/embed/xJV38Had9uA", trueTrophy: "36779", guesses: [] },
    { link: "https://www.youtube.com/embed/1P1V26UP114", trueTrophy: "82039", guesses: [] },
    { link: "https://www.youtube.com/embed/N8RTl28QCYw", trueTrophy: "36500", guesses: [] },
    { link: "https://www.youtube.com/embed/nJjNkNX6bdk", trueTrophy: "50000", guesses: [] },
    { link: "https://www.youtube.com/embed/xmgYR12sIJ4", trueTrophy: "25000", guesses: [] },
    { link: "https://www.youtube.com/embed/8CBCAtUMZPc", trueTrophy: "12000", guesses: [] },
    { link: "https://www.youtube.com/embed/8CBCAtUMZPc", trueTrophy: "12000", guesses: [] },
    { link: "https://www.youtube.com/embed/8CBCAtUMZPc", trueTrophy: "12000", guesses: [] },
    { link: "https://www.youtube.com/embed/T4e-1sgkkDA", trueTrophy: "110829", guesses: [] },
    { link: "https://www.youtube.com/embed/cMb2SHQU3Mo", trueTrophy: "18000", guesses: [] },
    { link: "https://www.youtube.com/embed/KSZOiAqpGe4", trueTrophy: "53400", guesses: [] },
    { link: "https://www.youtube.com/embed/IeqpEe1LFUE", trueTrophy: "34000", guesses: [] },
    { link: "https://www.youtube.com/embed/6No_evYamko", trueTrophy: "85585", guesses: [] },
    { link: "https://www.youtube.com/embed/OD1naIVT1Aw", trueTrophy: "85000", guesses: [] },
    { link: "https://www.youtube.com/embed/F5LTyXmrGaQ", trueTrophy: "78124", guesses: [] },
    { link: "https://www.youtube.com/embed/dTc2dvysCxM", trueTrophy: "69120", guesses: [] },
    { link: "https://www.youtube.com/embed/rFPvDFkKUbs", trueTrophy: "55097", guesses: [] },
    { link: "https://www.youtube.com/embed/oBMeZJx_hjs", trueTrophy: "40800", guesses: [] },
    { link: "https://www.youtube.com/embed/GxlG74B6rwo", trueTrophy: "52984", guesses: [] },
    { link: "https://www.youtube.com/embed/X4KDe0NXr_4", trueTrophy: "100000", guesses: [] },
    { link: "https://www.youtube.com/embed/WsgqqmCguAQ", trueTrophy: "25000", guesses: [] },
    { link: "https://www.youtube.com/embed/XCjtseC0Lsc", trueTrophy: "32857", guesses: [] },
    { link: "https://www.youtube.com/embed/2Gn4-BllRc8", trueTrophy: "73000", guesses: [] },
    { link: "https://www.youtube.com/embed/XCjtseC0Lsc", trueTrophy: "32857", guesses: [] },
    { link: "https://www.youtube.com/embed/b-SWjZmz_aE", trueTrophy: "60000", guesses: [] },
    { link: "https://www.youtube.com/embed/v1TerH0rqGU", trueTrophy: "44000", guesses: [] },
    { link: "https://www.youtube.com/embed/r_gvCdVwGgY", trueTrophy: "40000", guesses: [] },
    { link: "https://www.youtube.com/embed/fBhCJhpO1Dw", trueTrophy: "40000", guesses: [] },
    { link: "https://www.youtube.com/embed/qCC3nGOTIiE", trueTrophy: "50000", guesses: [] },
    { link: "https://www.youtube.com/embed/2ukmInNJ3R4", trueTrophy: "30922", guesses: [] },
    { link: "https://www.youtube.com/embed/AwnpLM63pH8", trueTrophy: "46716", guesses: [] },
    { link: "https://www.youtube.com/embed/XiLu-UEhcFQ", trueTrophy: "31000", guesses: [] },
    { link: "https://www.youtube.com/embed/Ayj-yzgMnlA", trueTrophy: "18000", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueTrophy: "45000", guesses: [] },
    { link: "https://www.youtube.com/embed/mLx83oQLRoc", trueTrophy: "26000", guesses: [] },
    { link: "https://www.youtube.com/embed/_U-MF4PUd7c", trueTrophy: "84504", guesses: [] },
    { link: "https://www.youtube.com/embed/_U-MF4PUd7c", trueTrophy: "25484", guesses: [] },
    { link: "https://www.youtube.com/embed/_U-MF4PUd7c", trueTrophy: "54515", guesses: [] },
    { link: "https://www.youtube.com/embed/_U-MF4PUd7c", trueTrophy: "14578", guesses: [] },
    { link: "https://www.youtube.com/embed/NG3YvfnoOYM", trueTrophy: "30000", guesses: [] },
    { link: "https://www.youtube.com/embed/S-6j11KWkkU", trueTrophy: "57000", guesses: [] },
    { link: "https://www.youtube.com/embed/ersaWEt4Vuc", trueTrophy: "50254", guesses: [] },
    { link: "https://www.youtube.com/embed/ersaWEt4Vuc", trueTrophy: "50247", guesses: [] },
    { link: "https://www.youtube.com/embed/8-eT1MTELpc", trueTrophy: "32857", guesses: [] },
    { link: "https://www.youtube.com/embed/ksHuXONEtuI", trueTrophy: "13047", guesses: [] },
    { link: "https://www.youtube.com/embed/4MD8nuX39es", trueTrophy: "42747", guesses: [] },
    { link: "https://www.youtube.com/embed/4MD8nuX39es", trueTrophy: "42747", guesses: [] },
    { link: "https://www.youtube.com/embed/8AxzOwwxNsI", trueTrophy: "38000", guesses: [] },
    { link: "https://www.youtube.com/embed/x-o1gFA9LrI", trueTrophy: "38000", guesses: [] },
    { link: "https://www.youtube.com/embed/LViQBR_CiCw", trueTrophy: "14000", guesses: [] },
    { link: "https://www.youtube.com/embed/LViQBR_CiCw", trueTrophy: "14000", guesses: [] },
    { link: "https://www.youtube.com/embed/HLWHpHkWuy8", trueTrophy: "74000", guesses: [] },
    { link: "https://www.youtube.com/embed/tqMVBoUZ-Us", trueTrophy: "39700", guesses: [] },
    { link: "https://www.youtube.com/embed/6PIAg_PKnk0", trueTrophy: "20001", guesses: [] },
    { link: "https://www.youtube.com/embed/2jTkzaf1ymw", trueTrophy: "31534", guesses: [] },
    { link: "https://www.youtube.com/embed/IJOcgZej8Nc", trueTrophy: "70000", guesses: [] },
    { link: "https://www.youtube.com/embed/Vb9WeKROv40", trueTrophy: "34000", guesses: [] },
    { link: "https://www.youtube.com/embed/t4BRifXPGGA", trueTrophy: "23000", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueTrophy: "45000", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueTrophy: "45000", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueTrophy: "45000", guesses: [] },
    { link: "https://www.youtube.com/embed/lhMZmIKaz78", trueTrophy: "45000", guesses: [] },
    { link: "https://www.youtube.com/embed/iw_dGyd3ZVo", trueTrophy: "65644", guesses: [] },
    { link: "https://www.youtube.com/embed/OXnmtUPUitQ", trueTrophy: "50500", guesses: [] },
    { link: "https://www.youtube.com/embed/0uOLwzlG3-Y", trueTrophy: "30000", guesses: [] },
    { link: "https://www.youtube.com/embed/ryQI9JEcLGc", trueTrophy: "24101", guesses: [] },
    { link: "https://www.youtube.com/embed/Pmr7xdeWxsM", trueTrophy: "34500", guesses: [] },
    { link: "https://www.youtube.com/embed/Pmr7xdeWxsM", trueTrophy: "34500", guesses: [] },
    { link: "https://www.youtube.com/embed/A0Sbw7_QB24", trueTrophy: "37000", guesses: [] },
    { link: "https://www.youtube.com/embed/AFXSw1lRRco", trueTrophy: "37000", guesses: [] },
    { link: "https://www.youtube.com/embed/gSZl6CZ2BaQ", trueTrophy: "29116", guesses: [] },
    { link: "https://www.youtube.com/embed/5czwWqBgSMw", trueTrophy: "82000", guesses: [] },
    { link: "https://www.youtube.com/embed/LTYgmxyHcZg", trueTrophy: "140000", guesses: [] },
    { link: "https://www.youtube.com/embed/ODjO2bn-bvU", trueTrophy: "4098", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueTrophy: "24000", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueTrophy: "24000", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueTrophy: "24000", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueTrophy: "24000", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueTrophy: "24000", guesses: [] },
    { link: "https://www.youtube.com/embed/Uec4kmcd8J4", trueTrophy: "24000", guesses: [] },
    { link: "https://www.youtube.com/embed/RPepxKvmLgw", trueTrophy: "34100", guesses: [] },
    { link: "https://www.youtube.com/embed/KlNSyZYj4hk", trueTrophy: "24019", guesses: [] },
    { link: "https://www.youtube.com/embed/W9VOpoqdR2E", trueTrophy: "15500", guesses: [] },
    { link: "https://www.youtube.com/embed/W9VOpoqdR2E", trueTrophy: "15000", guesses: [] },
    { link: "https://www.youtube.com/embed/kkmknDH18f8", trueTrophy: "30000", guesses: [] },
    { link: "https://www.youtube.com/embed/uKGPNwsqyZA", trueTrophy: "61000", guesses: [] },
    { link: "https://www.youtube.com/embed/OyM9xeZTfx4", trueTrophy: "74000", guesses: [] },
    { link: "https://www.youtube.com/embed/Q3sOpnXO8iQ", trueTrophy: "10722", guesses: [] },
    { link: "https://www.youtube.com/embed/djFFOWeYwTQ", trueTrophy: "10722", guesses: [] },
    { link: "https://www.youtube.com/embed/X4l6wFtgLQc", trueTrophy: "33541", guesses: [] },
    { link: "https://www.youtube.com/embed/L2imYBNEHRA", trueTrophy: "13000", guesses: [] },
    { link: "https://www.youtube.com/embed/eFfvP8-XjVg", trueTrophy: "65000", guesses: [] },
    { link: "https://www.youtube.com/embed/m7jhi4uj-no", trueTrophy: "22425", guesses: [] },
    { link: "https://www.youtube.com/embed/J2xif3YXB1c", trueTrophy: "19300", guesses: [] },
    { link: "https://www.youtube.com/embed/OVOYLgQfsc4", trueTrophy: "8000", guesses: [] },
    { link: "https://www.youtube.com/embed/Cbqk2EsjHgU", trueTrophy: "43287", guesses: [] },
    { link: "https://www.youtube.com/embed/k02c08f1tDc", trueTrophy: "43872", guesses: [] },
    { link: "https://www.youtube.com/embed/mV162rf_Dy8", trueTrophy: "87000", guesses: [] },
    { link: "https://www.youtube.com/embed/Qx_zDRVVUvQ", trueTrophy: "11272", guesses: [] },
    { link: "https://www.youtube.com/embed/RW9jdSiYq1g", trueTrophy: "36700", guesses: [] },
    { link: "https://www.youtube.com/embed/py3hoX29pBc", trueTrophy: "77000", guesses: [] },
    { link: "https://www.youtube.com/embed/rI3IJBxpQuU", trueTrophy: "18778", guesses: [] },
    { link: "https://www.youtube.com/embed/ae0HzlL-GL8", trueTrophy: "23598", guesses: [] },
    { link: "https://www.youtube.com/embed/8Ym9P_1h4OQ", trueTrophy: "10742", guesses: [] },
    { link: "https://www.youtube.com/embed/v3rfOVCx_Bk", trueTrophy: "19000", guesses: [] },
    { link: "https://www.youtube.com/embed/v3rfOVCx_Bk", trueTrophy: "35000", guesses: [] },
    { link: "https://www.youtube.com/embed/v3rfOVCx_Bk", trueTrophy: "40000", guesses: [] },
    { link: "https://www.youtube.com/embed/j_WLSHgvPMI", trueTrophy: "58300", guesses: [] },
    { link: "https://www.youtube.com/embed/Cb68u2DcS-M", trueTrophy: "23744", guesses: [] },
    { link: "https://www.youtube.com/embed/-Iuq2b3_CiY", trueTrophy: "25260", guesses: [] },
    { link: "https://www.youtube.com/embed/5rNmNOCimzo", trueTrophy: "42000", guesses: [] },
    { link: "https://www.youtube.com/embed/3CTb92Va_I8", trueTrophy: "27200", guesses: [] },
    { link: "https://www.youtube.com/embed/NkqQZyVYJzE", trueTrophy: "36983", guesses: [] },
    { link: "https://www.youtube.com/embed/lqDzn2YOPwE", trueTrophy: "17294", guesses: [] },
    { link: "https://www.youtube.com/embed/088yEyM4KRu", trueTrophy: "30000", guesses: [] },
    { link: "https://www.youtube.com/embed/0c0gTRF6Q7W", trueTrophy: "30000", guesses: [] },
    { link: "https://www.youtube.com/embed/Zf4yyFfLJGw", trueTrophy: "75000", guesses: [] },
    { link: "https://www.youtube.com/embed/dhvyuz8KKZw", trueTrophy: "2300", guesses: [] },
    { link: "https://www.youtube.com/embed/4Z77VhLQ2II", trueTrophy: "32000", guesses: [] },
    { link: "https://www.youtube.com/embed/oj9bpzrmEP8", trueTrophy: "32000", guesses: [] },
    { link: "https://www.youtube.com/embed/VAd_w1N5ctI", trueTrophy: "32000", guesses: [] },
    { link: "https://www.youtube.com/embed/-Bvw2pZEsok", trueTrophy: "26160", guesses: [] },
    { link: "https://www.youtube.com/embed/dQw4w9WgXcQ", trueTrophy: "100000", guesses: [] },
    { link: "https://www.youtube.com/embed/QUqzbZnFYa0", trueTrophy: "41340", guesses: [] },
    { link: "https://www.youtube.com/embed/HXuFDFntEBY", trueTrophy: "32000", guesses: [] },
    { link: "https://www.youtube.com/embed/3t21jlBaI28", trueTrophy: "69420", guesses: [] },
    { link: "https://www.youtube.com/embed/YQ2qYuL7Yik", trueTrophy: "52386", guesses: [] },
    { link: "https://www.youtube.com/embed/d1A50HSv-JY", trueTrophy: "30000", guesses: [] },
    { link: "https://www.youtube.com/embed/d1A50HSv-JY", trueTrophy: "30000", guesses: [] },
    { link: "https://www.youtube.com/embed/0u_tLZapATI", trueTrophy: "40000", guesses: [] },
    { link: "https://www.youtube.com/embed/kW6R7a548lY", trueTrophy: "30333", guesses: [] },
    { link: "https://www.youtube.com/embed/8rPrsHypK1E", trueTrophy: "30333", guesses: [] },
    { link: "https://www.youtube.com/embed/fOzL2M-Rs1M", trueTrophy: "43000", guesses: [] },
    { link: "https://www.youtube.com/embed/ZKkrBi6fbDw", trueTrophy: "17243", guesses: [] },
    { link: "https://www.youtube.com/embed/lslQSk5M2cI", trueTrophy: "75600", guesses: [] },
    { link: "https://www.youtube.com/embed/awUls0cfWpE", trueTrophy: "30254", guesses: [] },
    { link: "https://www.youtube.com/embed/JxZQMNnI03w", trueTrophy: "21000", guesses: [] },
    { link: "https://www.youtube.com/embed/bQM5L0N05qc", trueTrophy: "27864", guesses: [] },
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

function getRandomVideo() {
    currentVideoIndex = Math.floor(Math.random() * videoLinks.length);
    const videoFrame = document.getElementById("videoFrame");
    const rankDisplay = document.getElementById("rankDisplay");
    videoFrame.src = videoLinks[currentVideoIndex].link;
    console.log('Current video:', videoLinks[currentVideoIndex]);
    rankDisplay.textContent = `True Rank: ${videoLinks[currentVideoIndex].trueRank}`;
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
    if (selectedTrophyCount >= trueTrophy - trueTrophy * 0.15 && selectedTrophyCount <= trueTrophy + trueTrophy * 0.15) {
        flashColor = 'rgba(0, 255, 0, 0.85)';
    } else {
        flashColor = 'rgba(255, 0, 0, 0.85)';
    }

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

     document.documentElement.style.setProperty('--flash-color', flashColor);
     document.body.classList.add('flash');
     setTimeout(() => {
         document.body.classList.remove('flash');
         document.body.style.backgroundColor = 'var(--gray5)';
     }, 500);
 

    if (selectedTrophyCount >= trueTrophy - trueTrophy * 0.15 && selectedTrophyCount <= trueTrophy + trueTrophy * 0.15) {
        streak++;
    } else {
        streak = 0;
    }
    updateStreakDisplay();

    selectedTrophyCount = 1;
    document.getElementById("trophyRange").value = 1;
    document.getElementById("trophyValue").innerHTML = 1;
    getRandomTrophyVideo();
}

function submitGuess() {
    if (selectedRankName === null) {
        return;
    }
    const modal = document.getElementById("rankModal");
    const modalText = document.getElementById("modalText");
    const trueRank = videoLinks[currentVideoIndex].trueRank;
    modalText.innerHTML = `
        <p>You guessed: ${selectedRankName}</p>
        <p>True Rank: ${trueRank}</p>
        <canvas id="guessDistributionChart" width="400" height="400"></canvas>
    `;
    modal.style.display = "block";

    if (selectedRankName === trueRank) {
        streak++;
    } else {
        streak = 0;
    }
    updateStreakDisplay();

    console.log('Submitting guess:', {
        video_id: videoLinks[currentVideoIndex].link,
        guess: selectedRankName
    });

    fetch('https://solitary-star-3b20.caoalexander9-25f.workers.dev/api/guess', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            video_id: videoLinks[currentVideoIndex].link,
            guess: selectedRankName
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        console.log('Guess submitted:', data);
        showGuessDistribution(videoLinks[currentVideoIndex].link).then(() => {
            selectedRankName = null;
            buttons.forEach(button => {
                button.classList.remove('selected');
            });
            getRandomVideo();
        });
    }).catch(error => {
        console.error('Error:', error);
    });

}

function updateStreakDisplay() {
    const streakElement = document.getElementById("streak");
    streakElement.textContent = `Streak: ${streak}`;
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
    getRandomVideo();
});
document.addEventListener("DOMContentLoaded", updateSubmitButton);
document.getElementById("trophyRange").addEventListener("input", updateTrophyValue);

//updateTimer();
//setInterval(updateTimer, 1000);


// Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
    const modal = document.getElementById("rankModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


