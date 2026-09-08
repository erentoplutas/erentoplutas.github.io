# Akademik kişisel site — Jekyll + GitHub Pages

İki dilli (İngilizce / Türkçe), koyu–açık temalı, eklentisiz bir Jekyll sitesi.
İçeriğin tamamı `_data/` klasöründeki YAML dosyalarından gelir; şablonlara
dokunmadan sitenin tamamını güncelleyebilirsiniz.

```
/                 → İngilizce ana sayfa
/publications/    → Yayınlar
/cv/              → Özgeçmiş
/misc/            → Diğer
/tr/              → Türkçe karşılıkları (/tr/yayinlar/, /tr/ozgecmis/, /tr/diger/)
```

---

## 1. Yayına alma (5 dakika)

1. GitHub'da **`KULLANICIADI.github.io`** adında yeni bir depo (repository) açın.
   Kullanıcı adınız `erentoplutas` ise depo adı tam olarak
   `erentoplutas.github.io` olmalı.
2. Bu klasördeki dosyaların **tamamını** depoya yükleyin:

   ```bash
   cd site
   git init
   git add .
   git commit -m "İlk sürüm"
   git branch -M main
   git remote add origin https://github.com/KULLANICIADI/KULLANICIADI.github.io.git
   git push -u origin main
   ```

   (Terminal kullanmak istemezseniz: GitHub'da depo sayfasında
   **Add file → Upload files** ile klasördeki dosyaları sürükleyip bırakın.)

3. Depoda **Settings → Pages** bölümüne girin.
   *Source* olarak **Deploy from a branch**, dal olarak **main / (root)** seçin.
4. 1–2 dakika sonra site `https://KULLANICIADI.github.io` adresinde yayında olur.

> **Önemli:** `_config.yml` içindeki `url:` satırını kendi adresinizle
> güncelleyin. Yanlış kalırsa sosyal medya önizlemeleri ve site haritası
> yanlış adresi gösterir.

Kendi alan adınızı (ör. `erentoplutas.com`) kullanmak isterseniz: kök dizine
tek satırlık bir `CNAME` dosyası ekleyin, içine alan adını yazın ve
Settings → Pages → Custom domain alanına da girin.

---

## 2. Ne, nerede düzenlenir

| Ne değişecek | Dosya |
|---|---|
| Site adresi, dil ayarları | `_config.yml` |
| Ad, unvan, kurum, biyografi, ilgi alanları | `_data/profile.yml` |
| E-posta, ORCID, Scholar, LinkedIn, GitHub… | `_data/social.yml` |
| Menü adları ve sırası | `_data/nav.yml` |
| Yayın listesi | `_data/publications.yml` |
| Özgeçmiş zaman çizelgesi + PDF | `_data/cv.yml` |
| Ana sayfadaki haberler | `_data/news.yml` |
| "Diğer" sayfasındaki kutular | `_data/misc.yml` |
| Arayüz metinleri (butonlar, başlıklar) | `_data/i18n/en.yml`, `_data/i18n/tr.yml` |
| Renkler, yazı tipleri, boşluklar | `assets/css/style.css` (en üstteki `:root`) |

Her içerik alanı iki dillidir:

```yaml
role:
  en: "MD · Neurologist & Neuroscientist"
  tr: "Dr. · Nörolog & Sinirbilimci"
```

`&` işaretini YAML içinde `&amp;` olarak yazın (HTML'e olduğu gibi aktarılır).

---

## 3. Fotoğraf ve CV eklemek

* **Profil fotoğrafı:** Kare bir görseli `assets/img/profile.jpg` olarak
  kaydedin, sonra `_data/profile.yml` içinde:

  ```yaml
  photo: "/assets/img/profile.jpg"
  ```

  Şu an yerine geçici bir SVG (`profile-placeholder.svg`) kullanılıyor.

* **CV PDF'i:** Dosyayı `assets/files/cv.pdf` olarak koyun. `_data/cv.yml`
  içindeki `pdf:` satırı zaten oraya bakıyor. PDF koymak istemiyorsanız
  `pdf: ""` yapın; buton otomatik gizlenir.

* **Favicon:** `assets/img/favicon.svg` — içindeki harfi değiştirebilirsiniz.

---

## 4. Yayın eklemek

`_data/publications.yml` içindeki `items:` listesine yeni bir madde ekleyin:

```yaml
  - category: "article"        # article | chapter | conference | progress
    year: 2026
    authors: "Toplutaş E, Yazar B, Yazar C"
    title: "Makalenin tam başlığı"
    venue: "Journal of Something"
    details: "14(2), 55–70"
    doi: "10.1000/xyz123"      # varsa
    pdf: "/assets/files/makale.pdf"   # isteğe bağlı
    code: "https://github.com/..."    # isteğe bağlı
    selected: true             # ana sayfada da görünsün mü
```

* Yıllar otomatik olarak yeniden eskiye sıralanır.
* Kendi isminiz listede otomatik kalınlaşır — isim varyantlarınızı
  `_data/profile.yml` içindeki `name_highlight` listesine ekleyin.
* Yeni bir kategori isterseniz `categories:` listesine ekleyip aynı `key`
  değerini yayınlarda kullanın.

---

## 5. Yeni sayfa eklemek

İki dilli tutmak için iki dosya oluşturun. Örnek: "Teaching / Dersler"

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

`tr/dersler.html`:

```yaml
---
layout: page
lang: tr
nav_key: teaching
title: Dersler
permalink: /tr/dersler/
alt_url: /teaching/
---
<p>İçerik…</p>
```

Sonra `_data/nav.yml` dosyasına ekleyin:

```yaml
- key: "teaching"
  en: { label: "Teaching", url: "/teaching/" }
  tr: { label: "Dersler",  url: "/tr/dersler/" }
```

---

## 6. Renkleri değiştirmek

`assets/css/style.css` dosyasının en üstündeki `:root` bloğu tüm paleti
belirler. Vurgu rengini değiştirmek için üç yerdeki `--accent` değerini
güncelleyin (açık tema, koyu tema, `[data-theme="dark"]`):

```css
--accent:      #1f6f63;   /* açık tema */
--accent-ink:  #14514a;   /* bağlantı metni */
--accent-soft: rgba(31, 111, 99, 0.10);
```

Yazı tipleri `--font-display` (başlıklar) ve `--font-body` (metin)
değişkenlerinden gelir; Google Fonts bağlantısı `_includes/head.html`
içindedir.

---

## 7. Bilgisayarınızda önizleme (isteğe bağlı)

GitHub Pages'e göndermeden görmek isterseniz Ruby gerekir:

```bash
gem install bundler
bundle install
bundle exec jekyll serve
# → http://localhost:4000
```

Ruby kurmak istemiyorsanız bu adımı atlayabilirsiniz; GitHub Pages siteyi
kendisi derler.

---

## 8. Teknik notlar

* **Eklenti kullanılmıyor.** Site, GitHub Pages'in kendi Jekyll derleyicisiyle
  olduğu gibi çalışır; `github-pages` gem'i dışında bir şey gerekmez.
* Site haritası (`sitemap.xml`), `robots.txt`, `hreflang` etiketleri ve
  schema.org Person verisi elle yazılmıştır.
* Karanlık/aydınlık tema seçimi `localStorage` içinde saklanır; hiçbir şey
  seçilmemişse işletim sistemi tercihi kullanılır.
* Erişilebilirlik: klavye odak halkaları, "içeriğe geç" bağlantısı,
  `prefers-reduced-motion` desteği ve anlamlı `aria` etiketleri mevcuttur.
* `preview.mjs`, `shot.mjs`, `package.json` yalnızca geliştirme sırasında
  önizleme almak içindir; siteye dahil edilmez (`_config.yml` → `exclude`).
  İstemiyorsanız silebilirsiniz.

---

## English summary

A bilingual (EN/TR), plugin-free Jekyll site for an academic profile.
All content lives in `_data/*.yml` — you never have to touch the templates.
Create a repo named `USERNAME.github.io`, push these files, enable
**Settings → Pages → Deploy from a branch → main / (root)**, and update
`url:` in `_config.yml`. Edit `_data/profile.yml`, `_data/publications.yml`,
`_data/cv.yml`, `_data/social.yml` and `_data/news.yml` to make it yours.
Colours and fonts are CSS custom properties at the top of
`assets/css/style.css`.
