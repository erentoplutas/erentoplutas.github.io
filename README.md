# erentoplutas.github.io

Eren Toplutaş'ın akademik kişisel sitesinin kaynak kodu.
Yayında: **https://erentoplutas.github.io**

İki dilli (İngilizce / Türkçe), koyu–açık temalı, eklentisiz bir Jekyll sitesi.
GitHub Pages her commit'ten sonra kendisi derler.

```
/                 → About            /tr/            → Hakkımda
/publications/    → Publications     /tr/yayinlar/   → Yayınlar
/cv/              → CV               /tr/ozgecmis/   → Özgeçmiş
/misc/            → Misc             /tr/diger/      → Diğer
```

---

## Nasıl çalışıyor

İçeriğin tamamı `_data/` klasöründeki YAML dosyalarından gelir.
**Şablonlara (`_layouts`, `_includes`) dokunmanız gerekmez** — sitenin tamamını
yedi veri dosyasından yönetebilirsiniz.

Her içerik alanı iki dillidir:

```yaml
role:
  en: "MD, PhD · Neurologist &amp; Neuroscientist"
  tr: "Dr. Öğr. Üyesi · Nöroloji Uzmanı ve Sinirbilimci"
```

Boş kalan bölümler (yayını olmayan bir kategori, boş haber listesi) sayfada
otomatik gizlenir.

---

## Güncelleme

**En pratik yol:** Bu depo sayfasındayken klavyeden **`.`** tuşuna basın.
Aynı sekmede tarayıcı içi bir kod editörü (github.dev) açılır — kurulum
gerekmez. Dosyayı düzenleyin, sol kenardaki dal ikonundan (Source Control)
mesaj yazıp **Commit & Push**. Site 1–2 dakikada yenilenir.

Editörün avantajı, YAML girinti hatalarını commit etmeden önce göstermesidir.

**Tek satır değişecekse:** Dosyaya tıklayın → sağ üstteki kalem ikonu →
düzeltin → **Commit changes**.

**Dosyanın tamamı değişecekse:** İlgili klasöre girin →
**Add file → Upload files** → aynı adlı dosyayı sürükleyin (üzerine yazar).

---

## Yeni yayın ekleme

`_data/publications.yml` içindeki `items:` listesine ekleyin.
Sıralamayı site yapar (yeniden eskiye), siz sadece bloğu yapıştırın:

```yaml
  - category: "article"
    year: 2027
    authors: "Toplutaş E, Yazar B, Yazar C"
    title: "Makalenin tam başlığı"
    venue: "Journal of Something"
    details: "14(2), 55-70"
    doi: "10.1000/xyz123"
    selected: true
```

- `category` → `article`, `chapter`, `conference` veya `progress`
- `doi` → sadece numara, `https://doi.org/` olmadan. DOI yoksa satırı silip
  yerine `url: "https://pubmed..."` yazın
- `selected: true` → ana sayfadaki "Seçilmiş yayınlar" bölümüne de çıkar
- İsminiz listede otomatik kalınlaşır; `Toplutaş E` biçiminde yazmanız yeterli.
  Farklı yazımlar `_data/profile.yml` içindeki `name_highlight` listesinde

---

## Haber ekleme

`_data/news.yml` — ana sayfada en yeni dördü görünür.

```yaml
- date: 2027-03-01
  label: "2027"
  en: "New paper in **Brain Topography**."
  tr: "**Brain Topography** dergisinde yeni makale."
  url: "https://doi.org/10.1000/xyz123"
```

`date` yalnızca sıralama içindir, ekranda görünmez. `label` ekranda görünen
etikettir; yazmazsanız "Mar 2027" biçiminde kendisi oluşturur.

---

## Ne nerede

| Değiştirilecek | Dosya |
|---|---|
| Ad, unvan, kurum, biyografi, ilgi alanları, fotoğraf | `_data/profile.yml` |
| Yayın listesi | `_data/publications.yml` |
| Özgeçmiş bölümleri | `_data/cv.yml` |
| Ana sayfa haberleri | `_data/news.yml` |
| "Diğer" sayfasındaki kutular | `_data/misc.yml` |
| Bağlantı ikonları | `_data/social.yml` |
| Menü adları ve sırası | `_data/nav.yml` |
| Buton ve başlık metinleri | `_data/i18n/en.yml`, `_data/i18n/tr.yml` |
| Renkler, yazı tipleri | `assets/css/style.css` → en üstteki `:root` |
| Site adresi, dil ayarları | `_config.yml` |

**Fotoğraf:** Kare bir görseli `assets/img/` içine koyup `_data/profile.yml`
içindeki `photo:` satırını güncelleyin. 800×800 piksel yeterli.

**CV PDF'i:** Şu an kapalı. Açmak için PDF'i `assets/files/` içine koyup
`_data/cv.yml` içindeki `pdf: ""` satırını `pdf: "/assets/files/cv.pdf"`
yapın; indirme butonu geri gelir.

---

## Yeni sayfa ekleme

İki dilli tutmak için iki dosya gerekir. Örnek: "Teaching / Dersler"

`teaching.html` (kök dizin):

```yaml
---
layout: page
lang: en
nav_key: teaching
title: Teaching
permalink: /teaching/
alt_url: /tr/dersler/
---
<p>İçerik…</p>
```

`tr/dersler.html` aynı yapıda, `lang: tr` ve karşılıklı `permalink` / `alt_url`
ile. Sonra `_data/nav.yml` dosyasına ekleyin:

```yaml
- key: "teaching"
  en: { label: "Teaching", url: "/teaching/" }
  tr: { label: "Dersler",  url: "/tr/dersler/" }
```

---

## YAML'ı bozmadan

Sitenin bozulmasının neredeyse tek sebebi bozuk YAML'dır. Üç kural yeter:

1. **Girintiyi boşlukla yapın, Tab kullanmayın.** En güvenlisi var olan bir
   satırı kopyalayıp üzerine yazmaktır.
2. **Aynı seviyedeki satırlar aynı hizada başlar.** Bir yayın bloğunda
   `- category:` ile `year:` arasındaki fark iki boşluktur.
3. **Metni tırnak içine alın** — özellikle içinde `:` , `#` veya kesme işareti
   varsa. Türkçe karakterler sorun değildir.

Metin içinde "ve" anlamında `&` yazacaksanız `&amp;` biçiminde yazın.

---

## Ters giderse

| Belirti | Sebebi ve çözümü |
|---|---|
| Site güncellenmedi | Derleme 1–2 dakika sürer. Sonra <kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> ile sayfayı zorla yenileyin |
| Commit'in yanında kırmızı ✗ | YAML hatası. **Actions** sekmesinde başarısız işi açın; hangi dosyanın kaçıncı satırında sorun olduğunu yazar |
| Bir bölüm kayboldu | O bölümün listesi boşaldı ya da girinti bozuldu — ilgili `.yml` dosyasına bakın |
| Sayfa biçimsiz, düz yazı gibi | CSS yüklenmiyor. Depo adının `KULLANICIADI.github.io` olduğundan emin olun |
| Geri almak istiyorum | **Commits** listesinde bozulmadan önceki commit'i açın → **Revert** |

---

## Teknik notlar

- **Eklenti kullanılmıyor.** GitHub Pages'in kendi Jekyll derleyicisiyle olduğu
  gibi çalışır; `github-pages` gem'i dışında bir şey gerekmez.
- `sitemap.xml`, `robots.txt`, `hreflang` etiketleri ve schema.org Person
  verisi elle yazılmıştır.
- Tema seçimi `localStorage`'da saklanır; seçim yoksa işletim sistemi tercihi
  kullanılır.
- Erişilebilirlik: klavye odak halkaları, "içeriğe geç" bağlantısı,
  `prefers-reduced-motion` desteği, anlamlı `aria` etiketleri.
- CV sayfası yazdırmaya uygun biçimlendirilmiştir (`@media print`).

### Bilgisayarda önizleme (isteğe bağlı)

Değişiklikleri göndermeden görmek isterseniz Ruby gerekir:

```bash
bundle install
bundle exec jekyll serve   # → http://localhost:4000
```

Gerekmez — GitHub Pages siteyi kendisi derler.

---

## English

Source of a bilingual (EN/TR) academic site, built with plain Jekyll and no
plugins, served by GitHub Pages at **https://erentoplutas.github.io**.

All content lives in `_data/*.yml`; the templates in `_layouts` and `_includes`
rarely need touching. Press <kbd>.</kbd> on this repository page to open the
browser-based editor, change a data file, and commit — the site rebuilds in a
minute or two. Colours and fonts are CSS custom properties at the top of
`assets/css/style.css`.
