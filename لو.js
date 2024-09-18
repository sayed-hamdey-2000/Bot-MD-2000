let handler = async (m, { conn }) => {
    let answer = [
        'يكون عندك فلوس كثير وراسك راس حمار',
        'تعيش للأبد لكن تكون وحيد',
        'تحصل على مليون دولار لكن تفقد كل أصدقائك',
        'تكون مشهور لكن تفقد خصوصيتك',
        'تسافر حول العالم بدون مال أو تبقى في بلدك مع ثروة',
        'تقرأ عقول الناس أو تكون غير مرئي',
        'تعيش حياة مليئة بالمغامرات لكن بدون أمان',
        'تعود بالزمن إلى الماضي أو تذهب للمستقبل',
        'تحصل على وظيفة أحلامك لكن تعمل 12 ساعة يومياً',
        'تأكل طعامك المفضل فقط لبقية حياتك أو لا تأكله أبداً مجدداً',
        'تكون عبقريًا لكن غير سعيد أو سعيدًا لكن متوسط الذكاء',
        'تكون قادرًا على الطيران أو التنفس تحت الماء',
        'تعيش بدون تكنولوجيا أو بدون أصدقاء',
        'تكون غنيًا لكن مريض أو فقيرًا لكن بصحة ممتازة',
        'تعرف كل أسرار العالم أو لا تعرف أي سر أبدًا',
        'تكون الأفضل في شيء واحد أو تكون جيدًا في كل شيء',
        'تتحكم بالزمن أو تتحكم بالأفكار',
        'تعيش على جزيرة مهجورة أو في مدينة مكتظة بالسكان',
        'تكون قادرًا على تغيير الماضي أو التحكم في المستقبل',
        'تحصل على الحب الحقيقي أو على المال الذي لا ينفد'
    ];

    // اختيار سؤالين عشوائيين من القائمة
    let select = answer[Math.floor(Math.random() * answer.length)];
    let select2 = answer[Math.floor(Math.random() * answer.length)];

    let cap = `
╮───────────────────────╭ـ

│ ❓ *السؤال :*

│ *لو خيروك بين :  ❲ ${select} ❳*

│ *أو :  ❲ ${select2} ❳*

╯───────────────────────╰ـ`.trim();

    await conn.sendMessage(m.chat, { text: cap, mentions: [m.sender] }, { quoted: m });
};

handler.command = ['لو'];

export default handler;