const arkFood = (harga, voucher, jarak, pajak) => {
    let diskon = 0
    let hutang = 0
    let biayaPengiriman = 5000
    let potongan = 0
    let totalHarga = 0

    if (pajak === 'true') {
        hutang = 0.05
    }

    for(var i = 2; i < jarak; i++){
        biayaPengiriman += 3000
    }


    if (harga >= 25000) {    
        if (voucher) {
            if (voucher === 'DITRAKIRDEMY'){
                diskon = 0.6
                potongan = harga - (harga * diskon)
                if(potongan <= 30000) {
                    potongan = harga - (harga * diskon)
                    totalHarga = (harga + biayaPengiriman - potongan) + (harga * hutang)
                    console.log(`Harga: ${harga}`)
                    console.log(`Kode voucher: ${voucher}`)
                    console.log(`Potongan: ${potongan}`)
                    console.log(`Diskon: ${diskon * 100}%`)
                    console.log(`Biaya Antar: ${biayaPengiriman}`)
                    console.log(`Pajak: ${harga * hutang}`)
                    console.log(`SubTotal: ${totalHarga}`)
                } else {    // jika potongan melebihi 30000
                    potongan = 30000
                    totalHarga = (harga + biayaPengiriman - potongan) + (harga * hutang)
                    console.log(`Harga: ${harga}`)
                    console.log(`Kode voucher: ${voucher}`)
                    console.log(`Potongan: ${potongan}`)
                    console.log(`Diskon: ${diskon * 100}%`)
                    console.log(`Biaya Antar: ${biayaPengiriman}`)
                    console.log(`Pajak: ${harga * hutang}`)
                    console.log(`SubTotal: ${totalHarga}`)
                }
            }
        }
        else if(!voucher){  // jika voucher tidak dipakai
            potongan = 0
            totalHarga = (harga + biayaPengiriman - potongan) + (harga * hutang)
            console.log('pemesanan dibawah 25000')
            console.log(`Harga: ${harga}`)
            console.log(`Kode voucher: Tidak Ada`)
            console.log(`Potongan: ${potongan}`)
            console.log(`Tidak ada diskon`)
            console.log(`Biaya Antar: ${biayaPengiriman}`)
            console.log(`Pajak: ${harga * hutang}`)
            console.log(`SubTotal: ${totalHarga}`)
        }
    }

    if (harga >= 50000) {    
        if (voucher) {
            if (voucher === 'ARKAFOOD5'){
                diskon = 0.5
                potongan = harga - (harga * diskon)
                if(potongan <= 50000) {
                    potongan = harga - (harga * diskon)
                    totalHarga = (harga + biayaPengiriman - potongan) + (harga * hutang)
                    console.log(`Harga: ${harga}`)
                    console.log(`Kode voucher: ${voucher}`)
                    console.log(`Potongan: ${potongan}`)
                    console.log(`Diskon: ${diskon * 100}%`)
                    console.log(`Biaya Antar: ${biayaPengiriman}`)
                    console.log(`Pajak: ${harga * hutang}`)
                    console.log(`SubTotal: ${totalHarga}`)
                } else {    // jika potongan melebihi 30000
                    potongan = 50000
                    totalHarga = (harga + biayaPengiriman - potongan) + (harga * hutang)
                    console.log(`Harga: ${harga}`)
                    console.log(`Kode voucher: ${voucher}`)
                    console.log(`Potongan: ${potongan}`)
                    console.log(`Diskon: ${diskon * 100}%`)
                    console.log(`Biaya Antar: ${biayaPengiriman}`)
                    console.log(`Pajak: ${harga * hutang}`)
                    console.log(`SubTotal: ${totalHarga}`)
                }
            }
        }else {
            potongan = 0
            totalHarga = (harga + biayaPengiriman - potongan) + (harga * hutang)
            console.log('pemesanan dibawah 50000')
            console.log(`Harga: ${harga}`)
            console.log(`Potongan: ${potongan}`)
            console.log(`Tidak ada diskon`)
            console.log(`Biaya Antar: ${biayaPengiriman}`)
            console.log(`Pajak: ${harga * hutang}`)
            console.log(`SubTotal: ${totalHarga}`)
        }
    }
    console.log(`--------------------------------------`)
}


//TES CASE

arkFood(20000, 'DITRAKIRDEMY', 5, 'true')   // Saat harga dibawah 25000
arkFood(2000000, 'DITRAKIRDEMY', 5, 'true')


arkFood(20000, 'ARKAFOOD5', 5, 'true')  // Saat harga dibawah 50000
arkFood(2000000, 'ARKAFOOD5', 5, 'true')


arkFood(2000000, '', 5, 'true') // Saat voucher tidak dipakai

arkFood(2000000, 'ARKAFOOD5', 5, 'false') // Saat toko tidak menerapkan pajak


