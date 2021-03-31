const BIRIMSTRATEGYDATA = [
    {
        id: 0,
        path: '0',
        hedefler: [
            {
                id: 0,
                path: '0/0/0',
                adi: 'Ulaşım alt yapısını güçlendirmek',
                hedefGerceklesmeOrani: 55,
                performanslar: [
                    {
                        id: 0,
                        adi: 'Trafikteki sorunları en alt düzeye indirmek',
                        gerceklesmeOrani: 21,
                        birimId: 0,
                        isler: [
                            {
                                id: 0,
                                birimId: 9,
                                adi: 'Cadde ve bulvarlara döşenen New Jersey tipi beton bariyer uzunluğu',
                                OlcuBrimi: 'm',//yanina adam/gün sayısıda gerekiyor. Gerçek bir kıyaslama için
                                hedef: 200000,
                                gerceklesme: 50952,
                                gerceklesmeOrani: 25,
                                aciklama: '2019 yılında gerçekleştirilen mal alım ve yapım ihalelerinin içeriği, kapasitesi ve bütçesi; 2019 yılında yapılması hedeflenen kaldırım ve beton bariyer miktarına karşılamadığından; söz konusu işlerde 2019 yılı hedeflerine ulaşılamamıştır.'
                            },
                            {
                                id: 1,
                                birimId: 9,
                                adi: 'Cadde ve bulvarlara döşenen tretuvar uzunluğu',
                                OlcuBrimi: 'm²',
                                hedef: 1700000,
                                gerceklesme: 262000,
                                gerceklesmeOrani: 15,
                                aciklama: '2019 yılında gerçekleştirilen mal alım ve yapım ihalelerinin içeriği, kapasitesi ve bütçesi; 2019 yılında yapılması hedeflenen kaldırım ve beton bariyer miktarına karşılamadığından; söz konusu işlerde 2019 yılı hedeflerine ulaşılamamıştır.'
                            },
                            {
                                id: 2,
                                birimId: 9,
                                adi: 'Cadde ve bulvarlara döşenen bordür uzunluğu',
                                OlcuBrimi: 'm',
                                hedef: 800000,
                                gerceklesme: 179823,
                                gerceklesmeOrani: 22,
                                aciklama: '2019 yılında gerçekleştirilen mal alım ve yapım ihalelerinin içeriği, kapasitesi ve bütçesi; 2019 yılında yapılması hedeflenen kaldırım ve beton bariyer miktarına karşılamadığından; söz konusu işlerde 2019 yılı hedeflerine ulaşılamamıştır.'
                            },
                            {
                                id: 3,
                                birimId: 9,
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
                                birimId: 9,
                                adi: 'Ankara mücavir alanlarda beton bordür ve tretuvar yapılması iş',
                                OlcuBrimi: 'TL',
                                hedef: 325000000,
                                gerceklesme: 45142505,
                                gerceklesmeOrani: 14,
                                aciklama: '2019 yılında gerçekleştirilen mal alım ve yapım ihalelerinin içeriği, kapasitesi ve bütçesi; 2019 yılında yapılması hedeflenen kaldırım ve beton bariyer miktarına karşılamadığından; söz konusu işlerde 2019 yılı hedeflerine ulaşılamamıştır.'
                            },
                            {
                                id: 1,
                                birimId: 9,
                                adi: 'İstinad duvarı yapımı-Menfez yapımı',
                                OlcuBrimi: 'TL',
                                hedef: 3500000,
                                gerceklesme: 908000,
                                gerceklesmeOrani: 26,
                                aciklama: 'Planlama süreci içerisindeki maliyetlerin tam olarak belirlenememesinden dolayı sapma oluşmuştur.'
                            }
                        ],


                    },
                    {
                        id: 1,
                        path: '0/0/1',
                        adi: 'Hizmet alanlarında projelendirme ve uygulama süreçlerini etkin ve verimli yönetmek',
                        gerceklesmeOrani: 55,
                        performanslar: [{
                            id: 0,
                            adi: 'Ulaşımda altyapı sorunlarını ortadan kaldırmak',
                            gerceklesmeOrani: 22,
                            isler: [],
                            faaliyetler: []
                        }]
                    }
                ]
            },
            {
                id: 1,
                path: '0/0/1',
                adi: 'Ankara Büyükşehir Belediyesi mücavir alan ve Büyükşehir Belediyesine yeni katılan ilçe belediyelerindeki köylerin yol sorunlarını çözmek',
                hedefGerceklesmeOrani: 55,


            },
            {
                id: 2,
                path: '0/0/2',
                adi: 'Altyapı ve uygulama konusunda işbirliğini güçlendirmek',
                hedefGerceklesmeOrani: 55,
                performanslar: [{
                    id: 0,
                    path: '0/0/2/0',
                    adi: 'Altyapı hizmetlerinde vatandaşa kaliteli hizmet vermek',
                    gerceklesmeOrani: 55,
                    isler: [{
                        id: 0,
                        birimId: 12,
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
                            birimId: 12,
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
                    path: '0/0/2/1',
                    adi: 'Numarataj hizmetlerinde etkinlik sağlamak',
                    gerceklesmeOrani: 92,
                    isler: [{
                        id: 0,
                        birimId: 10,
                        adi: 'Takılan tabela sayısı',
                        OlcuBrimi: 'Adet',
                        hedef: 20000,
                        gerceklesme: 15417,
                        gerceklesmeOrani: 77,
                        aciklama: '31 Mart 2019 tarihinde Yerel Yönetim Seçimleri yapıldığından, seçim öncesinde seçmen kütüklerinin askıya çıkması nedeniyle adres değişikliği Yüksek Seçim Kurulu tarafından kanun ile durdurulduğundan numarataj güncelleme çalışması yapılamadığından belirtilen oran gerçekleştirilebilmiştir. '
                    },
                    {
                        id: 1,
                        birimId: 10,
                        adi: 'Dikilen direk sayısı',
                        OlcuBrimi: 'Adet',
                        hedef: 5000,
                        gerceklesme: 2763,
                        gerceklesmeOrani: 55,
                        aciklama: '31 Mart 2019 tarihinde Yerel Yönetim Seçimleri yapıldığından, seçim öncesinde seçmen kütüklerinin askıya çıkması nedeniyle adres değişikliği Yüksek Seçim Kurulu tarafından kanun ile durdurulduğundan numarataj güncelleme çalışması yapılamadığından belirtilen oran gerçekleştirilebilmiştir. '
                    },
                    {
                        id: 2,
                        birimId: 10,
                        adi: 'Ulusal Adres Veri Tabanı sisteminde güncellenen adres sayısı',
                        OlcuBrimi: 'Adet',
                        hedef: 32000,
                        gerceklesme: 35000,
                        gerceklesmeOrani: 109,
                        aciklama: null
                    },
                    {
                        id: 3,
                        birimId: 10,
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
                            birimId: 10,
                            adi: 'Numarataj hizmetleri',
                            OlcuBrimi: 'TL',
                            hedef: 2500000,
                            gerceklesme: 8663416,
                            gerceklesmeOrani: 347,
                            aciklama: 'Planlama süreci içerisindeki maliyetlerin tam olarak belirlenememesinden dolayı sapma oluşmuştur'
                        }
                    ]
                }]


            }
        ]
    },
	{
        id: 3,
        path: '1',
        hedefler: [
            {
                id: 0,
                path: '1/0',
                birimId: 0,
                adi: 'Ulaşım ve trafik hizmetlerinde etkili denetimler yapmak',
                hedefGerceklesmeOrani: 55,
                performanslar: [
                    {
                        id: 0,
                        path: '1/0/0',
                        adi: 'Gelen şikayetleri değerlendirmek ve denetim sayısını artırmak',
                        gerceklesmeOrani: 65,
                        birimId: 0,
                        isler: [{
                                id: 0,
                                birimId: 24,
                                adi: 'Ruhsatlı minibüs denetim sayısı',
                                OlcuBrimi: 'Adet',
                                hedef: 36300,
                                gerceklesme: 30318,
                                gerceklesmeOrani: 83,
                                aciklama: null
                               
                            },
                            {
                                id: 1,
                                birimId: 24,
                                adi: 'Servis araçları ve korsan araç denetim sayısı',
                                OlcuBrimi: 'Adet',
                                hedef: 5250,
                                gerceklesme: 3259,
                                gerceklesmeOrani: 62,
                                aciklama: 'Rutin denetimler dışında, Masa sisteminden ve yazılı şikayetlerde (dilekçe) azalma olmasından dolayı düşüş gerçekleşmiştir.'
                               
                            },
                            {
                                id: 2,
                                birimId: 24,
                                adi: 'Ticari taksi denetim sayısı',
                                OlcuBrimi: 'Adet',
                                hedef: 3550,
                                gerceklesme: 4372,
                                gerceklesmeOrani: 123,
                                aciklama: 'Rutin denetimler dışında, Masa sisteminden ve yazılı şikayetlerde (dilekçe) azalma olmasından dolayı düşüş gerçekleşmiştir.'
                              
                            },
                            {
                                id: 3,
                                birimId: 24,
                                adi: 'Hafriyat kamyonu denetim sayısı',
                                OlcuBrimi: 'Adet',
                                hedef: 6500,
                                gerceklesme: 753,
                                gerceklesmeOrani: 11,
                                aciklama: 'Rutin denetimler dışında, Masa sisteminden ve yazılı şikayetlerde (dilekçe) azalma olmasından dolayı düşüş gerçekleşmiştir.'
                              
                            },
                            {
                                id: 4,
                                birimId: 24,
                                adi: 'Muhtelif araç denetim sayısı',
                                OlcuBrimi: 'Adet',
                                hedef: 1500,
                                gerceklesme: 405,
                                gerceklesmeOrani: 27,
                                aciklama: 'Rutin denetimler dışında, Masa sisteminden ve yazılı şikayetlerde (dilekçe) azalma olmasından dolayı düşüş gerçekleşmiştir.'
                              
                            },
                            {
                                id: 5,
                                birimId: 24,
                                adi: 'Otopark işletmesi denetim sayısı',
                                OlcuBrimi: 'Adet',
                                hedef: 2300,
                                gerceklesme: 5977,
                                gerceklesmeOrani: 259,
                                aciklama: 'Belediye Meclisinin 13.03.2018 tarihli ve 356 sayılı kararı ile “ İşletme ve İştirakler Dairesi Başkanlığına bağlı Otoparklar Şube Müdürlüğünün kapatılmasına ve her türlü iş ve işlemleri ile demirbaşları ve personellerinin Zabıta Dairesi Başkanlığına devredilmesine….” dair karar verilmesi ile artış gerçekleşmiştir'
                               
                            },
                            {
                                id: 6,
                                birimId: 24,
                                adi: 'Şehirlerarası otobüs denetim sayısı',
                                OlcuBrimi: 'Adet',
                                hedef: 3750,
                                gerceklesme: 1857,
                                gerceklesmeOrani: 49,
                                aciklama: 'Rutin denetimler dışında, Masa sisteminden ve yazılı şikayetlerde (dilekçe) azalma olmasından dolayı düşüş gerçekleşmiştir.'
                              
                            }
                        ],
                        faaliyetler: [
                            {
                                id: 0,
                                birimId: 24,
                                adi: 'Ulaşım ve trafik faaliyetleri',
                                OlcuBrimi: 'TL',
                                hedef: 1379167,
                                gerceklesme: 507901,
                                gerceklesmeOrani: 37,
                                aciklama: 'Araç alımı olma ihtimali ve personel alımı olacağı düşünülerek giyecek giderleri , diğer müşavir firma ve kişilere ödemeler ödenek kalemi ile temsili ağırlama tören, fuar, organizasyon kalemlerinde yıl içinde harcama olmadığından fakat diğer yıllarda olması planlandığında dolayı ödenek ayrılmış olup kullanılmamıştır'
                              
                            }
                        ],


                    },
                    {
                        id: 1,
                        path: '1/0/1',
                        adi: 'İşyerlerinin denetimi artırmak ve olası iş kazalarını önlemek',
                        gerceklesmeOrani: 99,
                        isler: [{
                                    id: 0,
                                    birimId: 25,
                                    adi: 'GSM işyerleri denetim sayısı',
                                    OlcuBrimi: 'Adet',
                                    hedef: 7100,
                                    gerceklesme: 6956,
                                    gerceklesmeOrani: 97,
                                    aciklama: null
                                },{
                                    id: 1,
                                    birimId: 25,
                                    adi: 'Benzin ve LPG istasyonları denetim sayısı',
                                    OlcuBrimi: 'Adet',
                                    hedef: 160,
                                    gerceklesme: 221,
                                    gerceklesmeOrani: 138,
                                    aciklama: 'Rutin denetimler dışında, Masa sisteminden ve yazılı şikayetlerde (dilekçe) azalma olmasından dolayı artış gerçekleşmiştir.'
                                  
                                },{
                                    id: 2,
                                    birimId: 25,
                                    adi: 'Umumi tuvaletlerin denetim sayısı',
                                    OlcuBrimi: 'Adet',
                                    hedef: 200,
                                    gerceklesme: 136,
                                    gerceklesmeOrani: 68,
                                    aciklama: 'Rutin denetimler dışında, Masa sisteminden ve yazılı şikayetlerde (dilekçe) azalma olmasından dolayı düşüş gerçekleşmiştir.'
                                  
                                },{
                                    id: 3,
                                    birimId: 25,
                                    adi: 'Reklam ve Tabela Yönetmeliği’ne göre yapılan denetim sayısı',
                                    OlcuBrimi: 'Adet',
                                    hedef: 12200,
                                    gerceklesme: 13314,
                                    gerceklesmeOrani: 109,
                                    aciklama: null
                                },{
                                    id: 4,
                                    birimId: 25,
                                    adi: 'Otobüs yazıhanesi denetim sayısı',
                                    OlcuBrimi: 'Adet',
                                    hedef: 2550,
                                    gerceklesme: 2994,
                                    gerceklesmeOrani: 117,
                                    aciklama: null
                                },{
                                    id: 5,
                                    birimId: 25,
                                    adi: 'Büfe denetim sayısı',
                                    OlcuBrimi: 'Adet',
                                    hedef: 1100,
                                    gerceklesme: 1949,
                                    gerceklesmeOrani: 177,
                                    aciklama: 'Rutin denetimler dışında, Masa sisteminden ve yazılı şikayetlerde (dilekçe) azalma olmasından dolayı artış gerçekleşmiştir.'
                                  
                                },{
                                    id: 6,
                                    birimId: 25,
                                    adi: 'Muhtelif işyeri denetim sayısı',
                                    OlcuBrimi: 'Adet',
                                    hedef: 3000,
                                    gerceklesme: 2535,
                                    gerceklesmeOrani: 84,
                                    aciklama: null
                                }],
                            faaliyetler: [
                                {
                                    id: 0,
                                    birimId: 25,
                                    adi: 'Denetim faaliyetleri',
                                    OlcuBrimi: 'TL',
                                    hedef: 1379167,
                                    gerceklesme: 507901,
                                    gerceklesmeOrani: 37,
                                    aciklama: null
                                }
                            ]
                       
                    },
                    {
                            id: 0,
                            path: '1/0/2/0',
                            adi: 'Gelen şikayetleri değerlendirmek, görüntü kirliliğini önlemek ve kaldırım işgallerini engellemek',
                            gerceklesmeOrani: 22,
                            isler: [ {
                                    id: 0,
                                    birimId: 26,
                                    adi: 'Yakalanan seyyar satıcı sayısı',
                                    OlcuBrimi: 'Adet',
                                    hedef: 2500,
                                    gerceklesme: 5501,
                                    gerceklesmeOrani: 202,
                                    aciklama: null
                                },{
                                    id: 1,
                                    birimId: 26,
                                    adi: 'Yakalanan dilenci sayısı',
                                    OlcuBrimi: 'Adet',
                                    hedef: 5000,
                                    gerceklesme: 4095,
                                    gerceklesmeOrani: 81,
                                    aciklama: null
                                }],
                            faaliyetler: [
                                {
                                    id: 0,
                                    birimId: 26,
                                    adi: 'Seyyar satıcı ve dilenci faaliyetleri',
                                    OlcuBrimi: 'TL',
                                    hedef: 1379167,
                                    gerceklesme: 507901,
                                    gerceklesmeOrani: 37,
                                    aciklama: null
                                }
                            ]
                       
                    }
                    
                ]
            }
        ]
    },
	{
        id: 2,
        path: '1',
        hedefler: [
            {
                id: 0,
                path: '1/1',
                adi: 'Yeşil alanları arttırarak kişi başına düşen yeşil alan miktarını artırmayı sağlamak',
                hedefGerceklesmeOrani: 55,
                performanslar: [
                    {
                        id: 0,
                        path: '1/1/0',
                        adi: ' Yeşil alanları artırarak kişi başına düşen yeşil alan miktarını artırmak',
                        gerceklesmeOrani: 85,
                        isler: [
                            {
                                id: 0,
                                birimId: 22,
                                adi: 'Kişi başına düşen yeşil alan miktarı (m2)',
                                OlcuBrimi: 'm2',
                                hedef: 20,
                                gerceklesme: 19.94,
                                gerceklesmeOrani: 100,
                                aciklama: null
                            },{
                                id: 1,
                                birimId: 22,
                                adi: 'Yeni yapılan park sayısı',
                                OlcuBrimi: 'Adet',
                                hedef: 9,
                                gerceklesme: 0,
                                gerceklesmeOrani: 0,
                                aciklama: '2019 Yerel Yönetim Seçimi olması sebebiyle yılın ilk yarısı herhangi bir işlem yapılamamıştır. Daha sonra mevcut park yapımı yatırımları değerlendirilmiş olup, yeni yatırım planları yapılmıştır'
                            },{
                                id: 2,
                                birimId: 22,
                                adi: 'Yeni yapılan tesis sayısı',
                                OlcuBrimi: 'Adet',
                                hedef: 4,
                                gerceklesme: 5,
                                gerceklesmeOrani: 125,
                                aciklama: null
                            }
                        ],
                        faaliyetler: [
                            {
                                id: 0,
                                birimId: 22,
                                adi: 'Muhtelif park, tesis, rekreasyon alanı yapımı',
                                OlcuBrimi: 'TL',
                                hedef: 50000000,
                                gerceklesme: 2367282,
                                gerceklesmeOrani: 5,
                                aciklama: null
                            },
                            {
                                id: 1,
                                birimId: 22,
                                adi: 'Çubuk 1 Barajı Düğün Salonu',
                                OlcuBrimi: 'TL',
                                hedef: 15000000,
                                gerceklesme: 0,
                                gerceklesmeOrani: 0,
                                aciklama: 'Belediyemiz bütçe imkanları nedeniyle planlama kapsamına alınamamıştır.'
                            },
                            {
                                id: 2,
                                birimId: 22,
                                adi: 'Batıkent spor ve dinlenme parkı',
                                OlcuBrimi: 'TL',
                                hedef: 35000000,
                                gerceklesme: 0,
                                gerceklesmeOrani: 0,
                                aciklama: null
                            }
                        ],


                    },
                    {
                        id: 1,
                        path: '1/1/1',
                        adi: 'Bilinçli ve bilimsel mücadele yöntemleriyle çevre ve toplum sağlığının korunmasını sağlamak',
                        hedefGerceklesmeOrani: 55,
                        performanslar: [{
                            id: 0,
                            path: '1/0/1/0',
                            adi: 'Çevre kirliliğinin önlenmesi çevre ve toplum sağlığının korunması amacını sağlamak',
                            gerceklesmeOrani: 49,
                            isler: [
                                {
                                    id: 0,
                                    birimId: 19,
                                    adi: 'Vektörle mücadele edilen alan miktarı (ha)',
                                    OlcuBrimi: 'ha',
                                    hedef: 293402,
                                    gerceklesme: 143310,
                                    gerceklesmeOrani: 49,
                                    aciklama: null
                                } 
                            ],
                            faaliyetler: [
                                {
                                    id: 0,
                                    birimId: 19,
                                    adi: 'Vektörle mücadele hizmeti',
                                    OlcuBrimi: 'TL',
                                    hedef: 25000000,
                                    gerceklesme: 20307408,
                                    gerceklesmeOrani: 81,
                                    aciklama: null
                                },
                                {
                                    id: 1,
                                    birimId: 19,
                                    adi: 'Vektörle mücadele ilaç alımı',
                                    OlcuBrimi: 'TL',
                                    hedef: 15000000,
                                    gerceklesme: 0,
                                    gerceklesmeOrani: 0,
                                    aciklama: 'Vektörle mücadele hizmetinde kullanılan biyosidal ürünler, 696 sayılı KHK gereği doğrudan hizmet alımı içerisinde gerçekleştirilmiştir.'
                                }
                            ]
                        }]
                    }
                ]
            },
            {
                id: 1,
                path: '1/2',
                adi: 'Görsel zenginliğin oluşturulması amacıyla ağaç, fidan, çalı kullanmak ve mevsimlik çiçek uygulamaları ile de şehrin estetiğini artırmayı sağlamak',
                hedefGerceklesmeOrani: 12,


            }
        ]
    }


]

export default BIRIMSTRATEGYDATA