<template>
  <section>
    <div class="contacts-block container">
      <div class="contact-item">
        <div class="grid-item">
          <h1>Консультації та замовлення за телефонами</h1>
          <p>
            <a href="tel:+380501909337" class="callback-phone">+38 (050) 190-93-37</a>
          </p>

          <p>
            <a href="tel:+380501909337" class="callback-phone">+38 (050) 190-93-37</a>
          </p>

          <p>
            <a href="tel:+380501909337" class="callback-phone">+38 (050) 190-93-37</a>
          </p>
        </div>
        <div class="grid-item">
          <p class="working-hours-title">Графік роботи кол-центру(Пн-Сб)</p>
          <p class="working-hours">з 9:00 до 21:00</p>

          <p class="shops-title">Магазини та точки видачі</p>
          <p class="shops">м. Луцьк вул. Львівська 45а</p>
        </div>




      </div>
      <div class="contact-item-map">
        <div id="contact-map" class="contact-map" style="z-index: 1"></div>
      </div>

    </div>
  </section>
</template>

<script>

  import L from 'leaflet'
  import 'leaflet/dist/leaflet.css'
  export default {
    name: "Contacts",
    components: {
    },
    data () {
      return {
        url: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        maxZoom: 22,
        minZoom: 2,
        id: 'sim-sotok/ckb451ii212lq1imy0lpt6joa',
        accessToken: 'pk.eyJ1Ijoic2ltLXNvdG9rIiwiYSI6ImNrYjQxYWxiazBlZGcycW85dHZvNjBqeDcifQ.v0WbdBSOiuyQYDpkhi8QLg',
        map: null
      }
    },
    mounted () {

      this.map = L.map('contact-map', { attributionControl: false }).setView([50.743, 25.3424], 12)


      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        id: this.id,
        accessToken: this.accessToken,
        tileSize: 512,
        zoomOffset: -1
      }).addTo(this.map)

      let icon = L.icon({
        iconUrl: require('../assets/images/svg/marker.svg'),
        iconSize: [36, 36],
        popupAnchor: [0, -14],
      })

      const marker = L.marker([50.743, 25.3424], {icon: icon}).bindPopup(`<p style="text-align: center">Ми знаходимося <br> тут!</p>`)
      marker.on('click', (e) => {
        this.map.setView(e.latlng, 16)
      })

      marker.addTo(this.map).openPopup()

    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300&display=swap');
  .container {
    max-width: 1070px;
    margin: 0 auto;
  }

  .contacts-block {
    font-family: 'Roboto Condensed', sans-serif;
    display: grid;
    grid-template-columns: 1fr 1fr;

    .contact-item {
      display: grid;
      grid-template-columns: 1fr;
    }
    h1 {
      padding-top: 30px;
      color: #22283D;
      font-weight: bold;
      font-size: 20px;
    }

    p {
      margin-top: 15px;
    }

    .working-hours-title {
      padding-top: 0;
      font-size: 17px;
      font-weight: 600;
      margin-top: 0;
    }

    .working-hours {
      margin-top: 4px;
    }

    .callback-phone {
      color: #0288D1;
    }

    .shops-title {
      padding-top: 25px;
      font-size: 17px;
      font-weight: 600;
    }

    .shops {
      margin-top: 4px;
    }

    .contact-item-map {
      padding-top: 30px;

      .contact-map {
        height: 350px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

      }

    }
  }


  @media all and (max-width: 599px) {
    .contacts-block {
      padding: 0 15px;
      grid-template-columns: 1fr;

      .contact-item {
        grid-template-columns: 1fr 1fr;

        .shops-title {
          padding-top: 3px;
        }

        .working-hours-title {
          padding-top: 30px;
        }
      }

      .contact-item-map {
        margin-bottom: 30px;
      }
      h1 {
        text-align: left;
      }

    }
  }


</style>
