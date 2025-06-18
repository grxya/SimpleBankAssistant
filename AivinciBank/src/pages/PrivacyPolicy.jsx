"use client";

import { useEffect } from "react";
import { Shield } from "lucide-react";
import { useTheme } from "../components/ThemeContext";

const PrivacyPolicy = () => {
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
            Məxfilik siyasəti
          </h1>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-lg font-medium">
            Son yenilənmə tarixi: 10 İyun, 2025
          </p>

          <p>
            Aivinci Bank olaraq məxfiliyinizə hörmət edirik. Bu Məxfilik
            siyasəti şəxsi məlumatlarınızın necə toplandığını, istifadə
            edildiyini və qorunduğunu izah edir.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            1. Topladığımız məlumatlar
          </h2>

          <p>
            1.1. <strong>Şəxsi məlumatlar:</strong> Ad, soyad, ata adı, doğum
            tarixi, şəxsiyyət vəsiqəsi məlumatları, ünvan, telefon nömrəsi,
            e-poçt ünvanı.
          </p>

          <p>
            1.2. <strong>Maliyyə məlumatları:</strong> Hesab nömrələri, kart
            məlumatları, əməliyyat tarixçəsi, kredit tarixçəsi, gəlir
            məlumatları.
          </p>

          <p>
            1.3. <strong>Texniki məlumatlar:</strong> IP ünvanı, cihaz
            məlumatları, əməliyyat sistemi, brauzer növü, cookie məlumatları,
            mobil tətbiq istifadə statistikası.
          </p>

          <p>
            1.4. <strong>Ünsiyyət məlumatları:</strong> Müştəri xidməti ilə
            yazışmalar, zənglər, sorğular və şikayətlər.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            2. Məlumatların toplanma üsulları
          </h2>

          <p>
            2.1. <strong>Birbaşa təqdim etdiyiniz məlumatlar:</strong> Hesab
            açarkən, kredit müraciəti edərkən, xidmətlərimizdən istifadə edərkən
            və ya bizimlə əlaqə saxlayarkən təqdim etdiyiniz məlumatlar.
          </p>

          <p>
            2.2. <strong>Avtomatik toplanan məlumatlar:</strong> Veb saytımızı
            və ya mobil tətbiqimizi istifadə edərkən cookie-lər və oxşar
            texnologiyalar vasitəsilə toplanan məlumatlar.
          </p>

          <p>
            2.3. <strong>Üçüncü tərəflərdən alınan məlumatlar:</strong> Kredit
            büroları, dövlət qurumları və tərəfdaş təşkilatlardan alınan
            məlumatlar.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            3. Məlumatların istifadəsi
          </h2>

          <p>
            3.1. <strong>Xidmətlərin təqdim edilməsi:</strong> Hesabların idarə
            edilməsi, əməliyyatların aparılması, kartların verilməsi və
            xidmətlərimizin təmin edilməsi.
          </p>

          <p>
            3.2.{" "}
            <strong>Təhlükəsizlik və dələduzluğun qarşısının alınması:</strong>{" "}
            Şübhəli əməliyyatların aşkarlanması, hesabların qorunması və
            təhlükəsizlik tədbirlərinin həyata keçirilməsi.
          </p>

          <p>
            3.3. <strong>Qanuni öhdəliklərin yerinə yetirilməsi:</strong>{" "}
            Qanunvericiliyin tələblərinə uyğun olaraq məlumatların saxlanması,
            hesabatların təqdim edilməsi və hüquq-mühafizə orqanları ilə
            əməkdaşlıq.
          </p>

          <p>
            3.4. <strong>Xidmətlərin təkmilləşdirilməsi:</strong> Müştəri
            təcrübəsinin analizi, yeni xidmətlərin hazırlanması və mövcud
            xidmətlərin təkmilləşdirilməsi.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            4. Məlumatların paylaşılması
          </h2>

          <p>
            4.1. <strong>Xidmət təchizatçıları:</strong> Bankın adından
            xidmətlər göstərən üçüncü tərəf təchizatçılar (ödəniş prosessorları,
            IT xidmətləri, təhlükəsizlik xidmətləri).
          </p>

          <p>
            4.2. <strong>Tənzimləyici orqanlar:</strong> Mərkəzi Bank, Maliyyə
            Bazarlarına Nəzarət Palatası və digər nəzarət orqanları.
          </p>

          <p>
            4.3. <strong>Hüquq-mühafizə orqanları:</strong> Məhkəmə qərarları,
            qanuni tələblər və ya hüquqi proseslər əsasında.
          </p>

          <p>
            4.4. <strong>Tərəfdaş təşkilatlar:</strong> Yalnız sizin açıq
            razılığınızla və ya qanunvericiliyin tələb etdiyi hallarda.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            5. Məlumatların təhlükəsizliyi
          </h2>

          <p>
            5.1. <strong>Texniki tədbirlər:</strong> Şifrələmə, təhlükəsizlik
            divarları, müdaxilələrin aşkarlanması sistemləri və digər
            təhlükəsizlik texnologiyaları.
          </p>

          <p>
            5.2. <strong>Təşkilati tədbirlər:</strong> İşçilərin təlimi,
            məlumatlara giriş məhdudiyyətləri, təhlükəsizlik siyasətləri və
            prosedurları.
          </p>

          <p>
            5.3. <strong>Məlumat saxlama:</strong> Məlumatlar yalnız qanuni
            məqsədlər üçün lazım olduğu müddət ərzində saxlanılır.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">6. Sizin hüquqlarınız</h2>

          <p>
            6.1. <strong>Məlumatlara giriş:</strong> Haqqınızda topladığımız
            məlumatların surətini tələb etmək hüququ.
          </p>

          <p>
            6.2. <strong>Düzəliş:</strong> Yanlış və ya natamam məlumatların
            düzəldilməsini tələb etmək hüququ.
          </p>

          <p>
            6.3. <strong>Silinmə:</strong> Müəyyən şərtlər daxilində
            məlumatlarınızın silinməsini tələb etmək hüququ.
          </p>

          <p>
            6.4. <strong>Etiraz:</strong> Məlumatlarınızın işlənməsinə etiraz
            etmək hüququ.
          </p>

          <p>
            6.5. <strong>Məhdudlaşdırma:</strong> Məlumatlarınızın işlənməsini
            məhdudlaşdırmaq hüququ.
          </p>

          <p>
            6.6. <strong>Məlumatların daşınması:</strong> Məlumatlarınızı
            strukturlaşdırılmış, ümumi istifadə edilən və maşınla oxuna bilən
            formatda almaq hüququ.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">7. Cookie siyasəti</h2>

          <p>
            7.1. <strong>Zəruri cookie-lər:</strong> Veb saytın və ya mobil
            tətbiqin əsas funksiyalarının işləməsi üçün lazım olan cookie-lər.
          </p>

          <p>
            7.2. <strong>Analitik cookie-lər:</strong> İstifadəçi davranışını
            təhlil etmək və xidmətlərimizi təkmilləşdirmək üçün istifadə olunan
            cookie-lər.
          </p>

          <p>
            7.3. <strong>Funksional cookie-lər:</strong> Sizin seçimlərinizi
            yadda saxlamaq və daha yaxşı istifadəçi təcrübəsi təmin etmək üçün
            istifadə olunan cookie-lər.
          </p>

          <p>
            7.4. <strong>Cookie-lərin idarə edilməsi:</strong> Brauzer
            parametrlərinizi dəyişdirərək cookie-ləri idarə edə və ya blok edə
            bilərsiniz.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            8. Uşaqların məxfiliyi
          </h2>

          <p>
            Xidmətlərimiz 18 yaşdan kiçik şəxslər üçün nəzərdə tutulmayıb.
            Bilərəkdən 18 yaşdan kiçik şəxslərdən şəxsi məlumatlar toplamırıq.
            Əgər 18 yaşdan kiçik şəxs haqqında məlumat topladığımızı
            düşünürsünüzsə, xahiş edirik bizimlə əlaqə saxlayın.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            9. Beynəlxalq məlumat ötürmələri
          </h2>

          <p>
            Məlumatlarınız Azərbaycan Respublikasından kənarda yerləşən
            serverlərə və ya üçüncü tərəflərə ötürülə bilər. Bu cür hallarda,
            məlumatlarınızın müvafiq qanunvericiliyə uyğun olaraq qorunmasını
            təmin etmək üçün lazımi tədbirlər görürük.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            10. Məxfilik siyasətində dəyişikliklər
          </h2>

          <p>
            Bu Məxfilik siyasətini vaxtaşırı yeniləyə bilərik. Əhəmiyyətli
            dəyişikliklər olduqda, sizi veb saytımızda və ya mobil tətbiqdə
            bildiriş yerləşdirməklə və ya e-poçt göndərməklə
            məlumatlandıracağıq.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">11. Əlaqə məlumatları</h2>

          <p>
            Bu Məxfilik siyasəti ilə bağlı suallarınız və ya narahatlıqlarınız
            varsa, aşağıdakı üsullarla bizimlə əlaqə saxlaya bilərsiniz:
          </p>

          <ul>
            <li>E-poçt: privacy@aivincibank.az</li>
            <li>Telefon: +994 12 123 45 67</li>
            <li>Ünvan: Bakı şəhəri, Nəsimi rayonu, Nizami küçəsi 90A</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
