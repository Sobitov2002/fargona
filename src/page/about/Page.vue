<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '@/services/apiServices' 
import { useHead } from '@vueuse/head'
import { useLangStore } from '@/stores/lang'
const store = useLangStore()
useHead({
    title: "Biz haqimizda - Farg'ona24",
    meta: [
        {
            name: 'description',
            content: "Farg'ona24 haqida batafsil ma'lumot. Bizning maqsadimiz – Farg'onadagi eng dolzarb va ishonchli yangiliklarni yetkazish."
        },
        {
            name: 'keywords',
            content: "Farg'ona24 haqida, biz haqimizda, Farg'ona yangiliklar sayti, jamoa, maqsad"
        },
        {
            property: "og:title",
            content: "Biz haqimizda - Farg'ona24",
        },
        {
            property: 'og:image',
            content: 'https://ik.imagekit.io/vtroph5l9/Product/logotip.jpg?updatedAt=1746790238401',
        },
        {
            property: 'og:url',
            content: 'https://fargona24.uz/about',
        }
    ]
})




const aboutData = ref<TeamMember[]>([]);


const aboutHandler = async () =>{
        try {
            const response = await api.get('/team?lang=ru')
            aboutData.value = response.data
            console.log("About",aboutData.value);
        } catch (error) {
            console.log(error);
            
        }
}

onMounted (async () =>{
    await aboutHandler()
})
interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
}

const mainText = computed(() => {
    if (store.lang === 'uz') {
        return {
            text_1: "Farg'ona24 haqida",
            text_2: "FARGONA24.UZ. Web-Site OAV sifatida 2022 yil 26 iyul kuni O‘zbekiston Respublikasi Prezidenti Administratsiyasi huzuridagi Axborot va ommaviy kommunikatsiyalar agentligidan 1684 raqam bilan ro‘yxatga olingan. Muassis: “SAMANDAR FARGʻONA24” MChJ. Tahririyat manzili: 150606, Fargʻona viloyati Farg‘ona shahri Elektron manzil: stuychiyev882@gmail.com",
            text_3: "Farg‘ona24 bugungi kunda Fargʻona haqidagi eng so‘nggi xabarlarni yetkazuvchi koʻp yillik tajribaga ega ijtimoiy-siyosiy, axborot -tahliliy Ommaviy axborot vositasi.",
            text_4: "Bog'lanish",
            text_5: 'Bizning jamoa',
            text_6: "Ijtimoiy tarmoq",
            text_7: "Xalq dengizdir, xalq to‘lqindir, xalq kuchdir.Barcha islohotlar inson uchun.Shunday ekan biz oʻz faoliyatmizni jamiyat hayotida sodir boʻlayotgan yangiliklarni yoritishga qurganmiz. Xalq hayotida boʻlayotgan har bir voqelik biz uchun qiziq va muhimdir.Bosh qomusimizda belgilanganidek xalq davlat hokimyatining birdan - bir manbaaidir.",
            text_8: `Qishda qor yoqqani emas, yozda qor yoqqani yangilik.FARGONA24.UZʼning doimiy obunachilari yaxshi tushunadi: biz uchun yangilik — shunchaki voqea emas, unga berilgan o‘zgacha nigohdir.Har mavzuda boshqalarga ergashish emas, farqlanishga intilamiz.Shuning uchun har bir xabar, maqola yoki intervyuda o‘ziga xos "burgut tepaligidagi" nuqtayi nazar bo‘lmasa, boshqalardan farqlanmasak ommaga qo‘shilib ketamiz.`,
            text_9: "Fargʻona24da sabrini sinovda toblaganlar, mehnatdan qochmaydiganlargina ishlaydi.Bugun Oʻzbekistondagi koʻplab internet- nashrlarda bir vaqtlar faoliyatini FARGONA24.UZʻda boshlab, tajriba orttirgan Bloger va muxbirlar ishlayapti albatta biz bundan quvonamiz.FARGONA24.UZ allaqachon internet - nashrlar orasida katta maktab maqomini olib boʻlgan.",
            text_10:"Bizning asosiy qadriyatlarimiz"
        };
    }
    if (store.lang === 'ru') {
        return {
            text_1: "О Фаргона24",
            text_2: "FARGONA24.UZ. Веб-сайт как СМИ был зарегистрирован 26 июля 2022 года под номером 1684 при Агентстве информации и массовых коммуникаций при Администрации Президента Республики Узбекистан. Учредитель: “SAMANDAR FARGʻONA24” ООО. Адрес редакции: 150606, Ферганская область, город Фергана. Электронная почта: stuychiyev882@gmail.com",
            text_3: "Фаргона24 сегодня — это многолетнее социально-политическое, информационно-аналитическое средство массовой информации, доставляющее самые последние новости о Фергане.",
            text_4: "Контакты",
            text_5: "Наша команда",
            text_6: "Социальная сеть",
            text_7:"Народ — это море, народ — это волна, народ — это сила. Все реформы — для человека. Поэтому мы выстроили свою деятельность на освещении событий, происходящих в жизни общества. Каждое событие в жизни народа для нас интересно и важно. Как указано в нашей Конституции, народ является единственным источником государственной власти.",
            text_8: `Новость — это не когда снег идёт зимой, а когда он выпадает летом. Постоянные подписчики FARGONA24.UZ хорошо понимают: новость для нас — это не просто событие, а особый взгляд на него. Мы стараемся не следовать за другими в каждой теме, а стремимся быть уникальными. Поэтому если в каждой новости, статье или интервью нет своей "точки зрения с орлиной высоты", если мы ничем не отличаемся, то сливаемся с массой.`,
            text_9:"В Fargʻona24 работают только те, кто закалился в испытаниях и не боится труда. Сегодня во многих интернет-изданиях Узбекистана трудятся блогеры и корреспонденты, которые когда-то начали свою деятельность именно в FARGONA24.UZ и приобрели здесь опыт. Мы, конечно, гордимся этим. FARGONA24.UZ уже давно стал настоящей школой среди интернет-изданий.",
            text_10: "Наши основные ценности"
        };
    }
    if (store.lang === 'kr') {
        return {
            text_1: "Фарғона24 ҳақида",
            text_2: "FARGONA24.UZ. Веб-сайт ОАВ сифатида 2022 йил 26 июл куни Ўзбекистон Республикаси Президенти Администрацияси ҳузуридаги Ахборот ва оммавий коммуникациялар агентлигидан 1684 рақам билан рўйхатга олинган. Муассис: “SAMANDAR FARGʻONA24” МЧЖ. Таҳририят манзили: 150606, Фарғона вилояти, Фарғона шаҳри. Электрон манзил: stuychiyev882@gmail.com",
            text_3: "Фарғона24 бугунги кунда Фарғона ҳақидаги энг сўнгги хабарларни етказувчи кўп йиллик тажрибага эга ижтимоий-сиёсий, ахборот-таҳлилий Оммавий ахборот воситаси.",
            text_4: "Боғланиш",
            text_5: "Бизнинг жамоа",
            text_6: "Ижтимоий тармоқ",
            text_7: "Халқ денгиздир, халқ тўлқиндир, халқ кучдир. Барча ислоҳотлар инсон учун. Шунинг учун биз ўз фаолиятимизни жамият ҳаётида содир бўлаётган янгиликларни ёритишга қурганмиз. Халқ ҳаётида бўлаётган ҳар бир воқелик биз учун қизиқ ва муҳимдир. Бош қомусимизда белгиланганидек, халқ давлат ҳокимиятининг бирдан-бир манбаидир.",
            text_8: `Қишда қор ёққани эмас, ёзда қор ёққани янгилик. FARGONA24.UZ’нинг доимий обуначилари яхши тушунишади: биз учун янгилик — шунчаки воқеа эмас, унга берилган ўзгача нигоҳдир. Ҳар мавзуда бошқаларга эргашиш эмас, фарқланишга интиланамиз. Шунинг учун ҳар бир хабар, мақола ёки интервьюда ўзига хос "бурғут тепалигидаги" нуқтаи назар бўлмаса, бошқалардан фарқланмасак, оммага қўшилиб кетамиз.`,
            text_9: "Fargʻona24да сабрини синовда тоблаганлар, меҳнатдан қочмайдиганларгина ишлайди. Бугун Ўзбекистондаги кўплаб интернет нашрларда бир вақтлар фаолиятини FARGONA24.UZ’да бошлаб, тажриба орттирган блогер ва мухбирлар ишлаяпти — албатта, биз бундан қувонамиз. FARGONA24.UZ аллақачон интернет нашрлар орасида катта мактаб мақомини олиб бўлган.",
            text_10:"Бизнинг асосий қадриятларимиз"
        };
    }
});

</script>
<template>
    <div class=" flex-col space-y-5 max-w-[1250px] mx-auto p-5">
        <!-- About Section - Simplified -->
        <div class="container mx-auto px-4 py-12 rounded-xl bg-white dark:bg-slate-800">
            <div class="flex flex-col md:flex-row items-start gap-8">
                <div class="md:w-1/2">
                    <img src="https://ik.imagekit.io/vtroph5l9/Product/logotip.jpg?updatedAt=1746790238401"
                        alt="Farg'ona24 Office" class="w-full rounded-xl " loading="lazy" />
                </div>
                <div class="md:w-1/2 items-center flex-col">
                    <h2 class="text-4xl font-bold text-gray-800 uppercase dark:text-slate-200 mb-4">{{ mainText?.text_1
                        }}</h2>
                    <p class="text-gray-600 dark:text-slate-200 mb-4">
                        {{ mainText?.text_2 }}
                    </p>
                    <p class="text-gray-600 dark:text-slate-200 mb-4 border-t pt-2">
                        {{ mainText?.text_3 }}
                    </p>
                    <button
                        class="mt-2 bg-gray-800 dark:bg-gray-950 dark:text-slate-200 hover:bg-gray-700 text-lg text-white py-2 px-4 rounded-xl">
                        {{mainText?.text_4}} +998770007715
                    </button>
                </div>
            </div>
        </div>

        <!-- Stats Section - Simplified -->
        <div class="rounded-xl bg-white dark:bg-slate-800 py-12">
            <div class="container mx-auto px-4">
                <h2 class="md:text-4xl uppercase text-3xl font-bold text-gray-800 dark:text-slate-200 mb-6 text-center">
                    {{
                    mainText?.text_6 }}
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                        class="bg-gray-100 dark:bg-slate-950 p-4 text-center border rounded-xl border-gray-100 dark:border-none">
                        <div class="text-gray-800 dark:text-slate-200 font-bold text-2xl mb-1">400,000+</div>
                        <div class="text-gray-500 dark:text-slate-200">Telegram</div>
                    </div>

                    <div
                        class="bg-gray-100 dark:bg-slate-950 p-4 text-center border rounded-xl border-gray-100 dark:border-none">
                        <div class="text-gray-800 dark:text-slate-200 font-bold text-2xl mb-1">38,000+</div>
                        <div class="text-gray-500 dark:text-slate-200">Instagram</div>
                    </div>

                    <div
                        class="bg-gray-100 dark:bg-slate-950 p-4 text-center border rounded-xl border-gray-100 dark:border-none">
                        <div class="text-gray-800 dark:text-slate-200 font-bold text-2xl mb-1">5,000+</div>
                        <div class="text-gray-500 dark:text-slate-200">Facebook</div>
                    </div>

                    <div
                        class="bg-gray-100 dark:bg-slate-950 p-4 text-center border rounded-xl border-gray-100 dark:border-none">
                        <div class="text-gray-800 dark:text-slate-200 font-bold text-2xl mb-1">50,000+</div>
                        <div class="text-gray-500 dark:text-slate-200">Youtube</div>
                    </div>
                </div>


            </div>
        </div>

        <div class="rounded-xl bg-white dark:bg-slate-800 py-12">
            <div class="container mx-auto px-4">
                <h2 class="md:text-4xl uppercase text-3xl font-bold text-gray-800 dark:text-slate-200 mb-6 text-center">
                    {{
                    mainText?.text_10
                    }}

                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        class="bg-gray-100 dark:bg-slate-950 p-4 text-left border rounded-xl border-gray-100 dark:border-none">
                        <div class="text-gray-800 dark:text-slate-200 text-[16px] sm:text-lg  lg:text-xl mb-1">{{
                            mainText?.text_7 }}</div>

                    </div>

                    <div
                        class="bg-gray-100 dark:bg-slate-950 p-4 text-left border rounded-xl border-gray-100 dark:border-none">
                        <div class="text-gray-800 dark:text-slate-200 text-[16px] sm:text-lg  lg:text-xl mb-1">{{
                            mainText?.text_8 }}</div>
                    </div>




                </div>
                <div
                    class="bg-gray-100 mt-4 dark:bg-slate-950 p-4 text-left border rounded-xl border-gray-100 dark:border-none">
                    <div
                        class="text-gray-800 uppercase dark:text-slate-200 text-[16px] sm:text-lg  lg:text-xl text-xl mb-1">
                        {{
                        mainText?.text_9 }}</div>
                </div>


            </div>
        </div>

        <!-- Team Section - Simplified -->
        <div class="container mx-auto px-4 py-12 rounded-xl bg-white dark:bg-slate-800">
            <h2 class="text-4xl font-bold uppercase text-gray-800 dark:text-slate-200 mb-6 text-center">{{
                mainText?.text_5 }}
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="member in aboutData" :key="member.id"
                    class="border rounded-xl dark:bg-slate-900 border-gray-200 dark:border-none">
                    <img :src="`https://fargona24.uz/storage/${member.image}`" :alt="member.name"
                        class="w-full md:h-80 h-72 object-cover object-center rounded-t-xl" loading="lazy" />
                    <div class="p-4">
                        <h3 class="font-bold text-gray-800 dark:text-slate-200">{{ member.name }}</h3>
                        <p class="text-gray-600  dark:text-slate-200 text-sm">{{ member.role }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

