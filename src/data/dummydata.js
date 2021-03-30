const STRATEGYDATA = [
    {
        id: 0,
        adi: 'Güvenli, hızlı ve konforlu ulaşım hizmeti vermek',
        path:'0',
        hedefler: [{
            id: 0,
            path:'0/0',
            birimId: 0,
            adi: 'Ulaşım alt yapısını güçlendirmek',
            hedefGerceklesmeOrani: 55,
            performanslar: [
                {
                    id: 0,
                    path:'0/0/0',
                    adi: 'Trafikteki sorunları en alt düzeye indirmek',
                    gerceklesmeOrani:21,
                    birimId: 0,
                    isler: [
                        {
                            id: 0,
                            path:'0/0/0/0',
                            //birimlerin idleri eklenecek.
                            //müdürlükler nasıl olacak ayarlanacak
                            birimId: 0,
                            adi: 'Cadde ve bulvarlara döşenen New Jersey tipi beton bariyer uzunluğu',
                            OlcuBrimi: 'm',//yanina adam/gün sayısıda gerekiyor. Gerçek bir kıyaslama için
                            hedef: 200000,
                            gerceklesme: 50952,
                            gerceklesmeOrani: 25,
                            aciklama: '2019 yılında gerçekleştirilen mal alım ve yapım ihalelerinin içeriği, kapasitesi ve bütçesi; 2019 yılında yapılması hedeflenen kaldırım ve beton bariyer miktarına karşılamadığından; söz konusu işlerde 2019 yılı hedeflerine ulaşılamamıştır.'
                        },
                        {
                            id: 1,
                            path:'0/0/0/1',
                            birimId: 0,
                            adi: 'Cadde ve bulvarlara döşenen tretuvar uzunluğu',
                            OlcuBrimi: 'm²',
                            hedef: 1700000,
                            gerceklesme: 262000,
                            gerceklesmeOrani: 15,
                            aciklama: '2019 yılında gerçekleştirilen mal alım ve yapım ihalelerinin içeriği, kapasitesi ve bütçesi; 2019 yılında yapılması hedeflenen kaldırım ve beton bariyer miktarına karşılamadığından; söz konusu işlerde 2019 yılı hedeflerine ulaşılamamıştır.'
                        },
                        {
                            id: 2,
                            birimId: 0,
                            path:'0/0/0/2',
                            adi: 'Cadde ve bulvarlara döşenen bordür uzunluğu',
                            OlcuBrimi: 'm',
                            hedef: 800000,
                            gerceklesme: 179823,
                            gerceklesmeOrani: 22,
                            aciklama: '2019 yılında gerçekleştirilen mal alım ve yapım ihalelerinin içeriği, kapasitesi ve bütçesi; 2019 yılında yapılması hedeflenen kaldırım ve beton bariyer miktarına karşılamadığından; söz konusu işlerde 2019 yılı hedeflerine ulaşılamamıştır.'
                        },
                        {
                            id: 3,
                            birimId: 0,
                            path:'0/0/0/3',
                            adi: 'Yeni yol açımı ya da bakım onarım aşamasında yapılan sanat yapıları (istinad duvarımenfez)',
                            OlcuBrimi: 'Adet',
                            hedef: 43,
                            gerceklesme: 9,
                            gerceklesmeOrani: 21,
                            aciklama: 'Yönetim değişikliği nedeniyle sapmalar meydana geldiğinden dolayı hedeflenen planlara ulaşılamamıştır.'
                        }
                    ],
                    faaliyetler: [
                        {
                            id: 0,
                            birimId: 0,
                            path:'0/0/0/0/0',
                            adi: 'Ankara mücavir alanlarda beton bordür ve tretuvar yapılması iş',
                            OlcuBrimi: 'TL',
                            hedef: 325000000,
                            gerceklesme: 45142505,
                            gerceklesmeOrani: 14,
                            aciklama: '2019 yılında gerçekleştirilen mal alım ve yapım ihalelerinin içeriği, kapasitesi ve bütçesi; 2019 yılında yapılması hedeflenen kaldırım ve beton bariyer miktarına karşılamadığından; söz konusu işlerde 2019 yılı hedeflerine ulaşılamamıştır.'
                        },
                        {
                            id: 1,
                            birimId: 0,
                            path:'0/0/0/0/1',
                            adi: 'İstinad duvarı yapımı-Menfez yapımı',
                            OlcuBrimi: 'TL',
                            hedef: 3500000,
                            gerceklesme: 908000,
                            gerceklesmeOrani: 26,
                            aciklama: 'Planlama süreci içerisindeki maliyetlerin tam olarak belirlenememesinden dolayı sapma oluşmuştur.'
                        }
                    ],
                }

            ]

        },
        {
            id: 1,
            path:'0/1',
            birimId: 0,
            adi: 'Hizmet alanlarında projelendirme ve uygulama süreçlerini etkin ve verimli yönetmek',
            hedefGerceklesmeOrani: 55,
            performanslar: [{
                id: 0,
                path:'0/1/0',
                birimId: 0,
                adi: 'Ulaşımda altyapı sorunlarını ortadan kaldırmak',
                gerceklesmeOrani:22,
                isler: [],
                faaliyetler: []
            }]
        }
        ]
    },
    {
        id: 1,
        path:'1',
        adi: 'Güvenli, hızlı ve konforlu ulaşım hizmeti vermek',
        hedefler: [{
            id:0,
            path:'1/0',
            birimId: 0,
            adi:'Ankara Büyükşehir Belediyesi mücavir alan ve Büyükşehir Belediyesine yeni katılan ilçe belediyelerindeki köylerin yol sorunlarını çözmek',
            hedefGerceklesmeOrani: 66,

        }]
    },
    {
        id: 2,
        path:'2',
        adi: 'Hizmet alanlarında projelendirme ve uygulama süreçlerini etkin ve verimli yönetmek',
        hedefler: [{
            id: 0,
            path:'2/0',
            birimId: 0,
            adi: 'Altyapı ve uygulama konusunda işbirliğini güçlendirmek',
            hedefGerceklesmeOrani:88,
            performanslar: [{
                id: 0,
                path:'2/0/0',
                birimId: 0,
                adi: 'Altyapı hizmetlerinde vatandaşa kaliteli hizmet vermek',
                gerceklesmeOrani:55,
                isler: [{
                    id: 0,
                    birimId: 0,
                    path:'2/0/0/0',
                    adi: 'AYKOME tarafından verilen ruhsat sayısı ',
                    OlcuBrimi: 'Adet',
                    hedef: 19000,
                    gerceklesme: 10404,
                    gerceklesmeOrani: 55,
                    aciklama: 'Planlama süreci içerisindeki arz/talep in tam olarak belirlenememesinden dolayı sapma oluşmuştur.'
                }],
                faaliyetler: [
                    {
                        id: 0,
                        birimId: 0,
                        path:'2/0/0/0/0',
                        adi: 'Aykome hizmetler',
                        OlcuBrimi: 'TL',
                        hedef: 1000,
                        gerceklesme: 0,
                        gerceklesmeOrani: 0,
                        aciklama: 'Planlama süreci içerisindeki maliyetlerin tam olarak belirlenememesinden dolayı sapma oluşmuştur'
                    }
                ]
            },
            {
                id: 1,
                path:'2/0/1',
                birimId: 0,
                adi: 'Numarataj hizmetlerinde etkinlik sağlamak',
                gerceklesmeOrani:92,
                isler: [{
                    id: 0,
                    birimId: 0,
                    path:'2/0/1/0',
                    adi: 'Takılan tabela sayısı',
                    OlcuBrimi: 'Adet',
                    hedef: 20000,
                    gerceklesme: 15417,
                    gerceklesmeOrani: 77,
                    aciklama: '31 Mart 2019 tarihinde Yerel Yönetim Seçimleri yapıldığından, seçim öncesinde seçmen kütüklerinin askıya çıkması nedeniyle adres değişikliği Yüksek Seçim Kurulu tarafından kanun ile durdurulduğundan numarataj güncelleme çalışması yapılamadığından belirtilen oran gerçekleştirilebilmiştir. '
                },
                {
                    id: 1,
                    birimId: 0,
                    path:'2/0/1/1',
                    adi: 'Dikilen direk sayısı',
                    OlcuBrimi: 'Adet',
                    hedef: 5000,
                    gerceklesme: 2763,
                    gerceklesmeOrani: 55,
                    aciklama: '31 Mart 2019 tarihinde Yerel Yönetim Seçimleri yapıldığından, seçim öncesinde seçmen kütüklerinin askıya çıkması nedeniyle adres değişikliği Yüksek Seçim Kurulu tarafından kanun ile durdurulduğundan numarataj güncelleme çalışması yapılamadığından belirtilen oran gerçekleştirilebilmiştir. '
                },
                {
                    id: 2,
                    birimId: 0,
                    path:'2/0/1/2',
                    adi: 'Ulusal Adres Veri Tabanı sisteminde güncellenen adres sayısı',
                    OlcuBrimi: 'Adet',
                    hedef: 32000,
                    gerceklesme: 35000,
                    gerceklesmeOrani: 109,
                    aciklama: null
                },
                {
                    id: 3,
                    birimId: 0,
                    path:'2/0/1/3',
                    adi: 'Takılan kapı numarası sayısı',
                    OlcuBrimi: 'Adet',
                    hedef: 35000,
                    gerceklesme: 38808,
                    gerceklesmeOrani: 111,
                    aciklama: null
                }],
                faaliyetler: [
                    {
                        id: 0,
                        birimId: 0,
                        path:'2/0/1/0/0',
                        adi: 'Numarataj hizmetleri',
                        OlcuBrimi: 'TL',
                        hedef: 2500000,
                        gerceklesme: 8663416,
                        gerceklesmeOrani: 347,
                        aciklama: 'Planlama süreci içerisindeki maliyetlerin tam olarak belirlenememesinden dolayı sapma oluşmuştur'
                    }
                ]
            }]

        }],
    }
]

export default STRATEGYDATA