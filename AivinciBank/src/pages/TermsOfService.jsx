"use client";

import { useEffect } from "react";
import { Shield } from "lucide-react";
import { useTheme } from "../components/ThemeContext";

const TermsOfService = () => {
  const { darkMode } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-grow py-16 px-4 md:px-8 animated-bg mt-32">
      <div className="max-w-4xl mx-auto bg-background rounded-lg shadow-lg p-6 md:p-10 border border-surface-hover">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent flex items-center">
            <Shield className="mr-2 h-6 w-6 text-lime-500" />
            İstifadə şərtləri
          </h1>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-lg font-medium">
            Son yenilənmə tarixi: 10 İyun, 2025
          </p>

          <p>
            Aivinci Bank-ın xidmətlərindən istifadə etməklə, siz bu İstifadə
            şərtləri ilə razılaşmış olursunuz. Xahiş edirik bu sənədi diqqətlə
            oxuyun.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">1. Ümumi müddəalar</h2>

          <p>
            1.1. Bu İstifadə şərtləri ("Şərtlər") Aivinci Bank ("Bank") və onun
            müştəriləri ("Müştəri" və ya "Siz") arasında münasibətləri
            tənzimləyir.
          </p>

          <p>
            1.2. Bu Şərtlər Bankın bütün xidmətlərinə, o cümlədən internet
            bankçılıq, mobil tətbiq, kart xidmətləri və digər bank xidmətlərinə
            tətbiq edilir.
          </p>

          <p>
            1.3. Bank bu Şərtləri istənilən vaxt dəyişdirmək hüququnu özündə
            saxlayır. Dəyişikliklər Bankın rəsmi veb saytında və ya mobil
            tətbiqində dərc edildiyi tarixdən qüvvəyə minir.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            2. Hesab açılması və idarə edilməsi
          </h2>

          <p>
            2.1. Hesab açmaq üçün Müştəri tələb olunan bütün məlumatları dəqiq
            və tam şəkildə təqdim etməlidir.
          </p>

          <p>
            2.2. Müştəri hesab məlumatlarının məxfiliyini qorumaq və
            təhlükəsizlik məlumatlarını (şifrələr, PIN kodlar, təsdiqləmə
            kodları) üçüncü şəxslərlə paylaşmamaq öhdəliyi daşıyır.
          </p>

          <p>
            2.3. Bank, qanunvericiliyin tələblərinə uyğun olaraq və ya
            təhlükəsizlik səbəbləri ilə hesabı dondurmaq, bağlamaq və ya
            məhdudlaşdırmaq hüququna malikdir.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            3. Onlayn və mobil bankçılıq
          </h2>

          <p>
            3.1. Bank onlayn və mobil bankçılıq xidmətlərinin fasiləsiz
            işləməsinə zəmanət vermir. Texniki problemlər, təmir işləri və ya
            digər səbəblərdən xidmətlər müvəqqəti olaraq dayandırıla bilər.
          </p>

          <p>
            3.2. Müştəri onlayn və mobil bankçılıq xidmətlərindən istifadə
            edərkən təhlükəsizlik tədbirlərinə riayət etməlidir, o cümlədən:
          </p>

          <ul>
            <li>Güclü və unikal şifrələrdən istifadə etmək</li>
            <li>Şifrələri mütəmadi olaraq dəyişdirmək</li>
            <li>İctimai Wi-Fi şəbəkələrində bank əməliyyatları aparmamaq</li>
            <li>Cihazların təhlükəsizliyini təmin etmək</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">
            4. Ödənişlər və köçürmələr
          </h2>

          <p>
            4.1. Bank tərəfindən müəyyən edilmiş gündəlik və aylıq köçürmə
            limitləri tətbiq olunur. Bu limitlər haqqında məlumat Bankın rəsmi
            veb saytında və ya mobil tətbiqində yerləşdirilir.
          </p>

          <p>
            4.2. Köçürmə əməliyyatları zamanı Müştəri bütün məlumatların
            düzgünlüyünü yoxlamalıdır. Bank, Müştəri tərəfindən səhv daxil
            edilmiş məlumatlara görə məsuliyyət daşımır.
          </p>

          <p>
            4.3. Beynəlxalq köçürmələr zamanı əlavə komissiyalar və
            məhdudiyyətlər tətbiq oluna bilər.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">5. Kart xidmətləri</h2>

          <p>
            5.1. Bank kartları Bankın mülkiyyətidir və Müştəriyə müvəqqəti
            istifadə üçün verilir.
          </p>

          <p>
            5.2. Müştəri kart məlumatlarının təhlükəsizliyini təmin etməli və
            kartın itirilməsi və ya oğurlanması halında dərhal Banka məlumat
            verməlidir.
          </p>

          <p>
            5.3. Bank, Müştərinin təqsiri üzündən kartın icazəsiz istifadəsi
            nəticəsində yaranan zərərə görə məsuliyyət daşımır.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            6. Komissiyalar və tariflər
          </h2>

          <p>
            6.1. Bank xidmətləri üçün komissiyalar və tariflər Bankın rəsmi veb
            saytında və ya mobil tətbiqində dərc olunur.
          </p>

          <p>
            6.2. Bank komissiyaları və tarifləri birtərəfli qaydada dəyişdirmək
            hüququna malikdir. Dəyişikliklər haqqında məlumat ən azı 30 gün
            əvvəl Bankın rəsmi veb saytında və ya mobil tətbiqində
            yerləşdirilir.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            7. Məsuliyyətin məhdudlaşdırılması
          </h2>

          <p>7.1. Bank aşağıdakı hallarda məsuliyyət daşımır:</p>

          <ul>
            <li>
              Fors-major halları (təbii fəlakətlər, müharibə, terror aktları,
              dövlət orqanlarının qərarları və s.)
            </li>
            <li>Üçüncü tərəflərin hərəkətləri və ya hərəkətsizliyi</li>
            <li>Texniki nasazlıqlar və ya proqram təminatı xətaları</li>
            <li>Müştərinin bu Şərtləri pozması</li>
          </ul>

          <p>
            7.2. Bank heç bir halda dolayı zərərlərə, o cümlədən əldən çıxmış
            gəlirə, işgüzar nüfuza dəymiş zərərə və ya mənəvi zərərə görə
            məsuliyyət daşımır.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            8. Mübahisələrin həlli
          </h2>

          <p>
            8.1. Bu Şərtlərdən irəli gələn bütün mübahisələr ilk növbədə
            danışıqlar yolu ilə həll edilməlidir.
          </p>

          <p>
            8.2. Danışıqlar yolu ilə həll edilməyən mübahisələr Azərbaycan
            Respublikasının qanunvericiliyinə uyğun olaraq məhkəmə qaydasında
            həll edilir.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">9. Yekun müddəalar</h2>

          <p>
            9.1. Bu Şərtlər Azərbaycan Respublikasının qanunvericiliyinə uyğun
            olaraq təfsir edilir və tənzimlənir.
          </p>

          <p>
            9.2. Bu Şərtlərin hər hansı bir müddəası etibarsız hesab edilərsə,
            bu, digər müddəaların etibarsızlığına səbəb olmur.
          </p>

          <p>
            9.3. Bu Şərtlər ilə bağlı suallarınız varsa, Bankın müştəri xidməti
            ilə əlaqə saxlaya bilərsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
