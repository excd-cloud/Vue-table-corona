<template>
  <div>
    <CCardBody>
      <CDataTable
        :items="tableData"
        :fields="fields"
        items-per-page-select
        :items-per-page="5"
        hover
        border
        striped
        :sorter="{resetable: true}"
        pagination
      >
        <template #checkbox="{item}">
          <td>
            <input type="checkbox" :value="item.pref_id" v-model="chartSet" />
          </td>
        </template>
        <template #cases="{item}">
          <td>
            {{ item.cases }}
            <span
              class="table__plus"
              :style="{color: numCheck(item.casesRatio)}"
            >{{ item.casesRatio }}</span>
          </td>
        </template>
        <template #hospitalize="{item}">
          <td>
            {{ item.hospitalize }}
            <span
              class="table__plus"
              :style="{color: numCheck(item.hospitalizeRatio)}"
            >{{ item.hospitalizeRatio }}</span>
          </td>
        </template>
        <template #discharge="{item}">
          <td>
            {{ item.discharge }}
            <span
              class="table__plus"
              :style="{color: dischargeAndPcr(item.dischargeRatio)}"
            >{{ item.dischargeRatio }}</span>
          </td>
        </template>
        <template #severe="{item}">
          <td>
            {{ item.severe }}
            <span
              class="table__plus"
              :style="{color: numCheck(item.severeRatio)}"
            >{{ item.severeRatio }}</span>
          </td>
        </template>
        <template #deaths="{item}">
          <td>
            {{ item.deaths }}
            <span
              class="table__plus"
              :style="{color: numCheck(item.deathsRatio)}"
            >{{ item.deathsRatio }}</span>
          </td>
        </template>
        <template #pcr="{item}">
          <td>
            {{ item.pcr }}
            <span
              class="table__plus"
              :style="{color: dischargeAndPcr(item.pcrRatio)}"
            >{{item.pcrRatio }}</span>
          </td>
        </template>
        <template #population="{item}">
          <td>{{ item.population }}</td>
        </template>
      </CDataTable>
    </CCardBody>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      chartSet: [],
      tableData: [],
      fields: [
        { key: "checkbox", label: "", sorter: false },
        { key: "prefecture", label: "都道府県", sorter: false, _style: "min-width:95px" },
        { key: "cases", label: "感染者", _style: "min-width:80px" },
        { key: "hospitalize", label: "入院中", _style: "min-width:80px" },
        { key: "discharge", label: "退院", _style: "min-width:80px" },
        { key: "severe", label: "重症", _style: "min-width:80px" },
        { key: "deaths", label: "死者", _style: "min-width:80px" },
        { key: "pcr", label: "PCR検査", _style: "min-width:95px" },
        { key: "population", label: "人口", _style: "min-width:80px" },
      ],
    };
  },

  computed: {
    ...mapState(["allCoronaData"]),
    ...mapGetters([
      "prefDataFilter",
      "comparison",
      "numCheck",
      "dischargeAndPcr",
    ]),
  },
  watch: {
    chartSet() {
      this.chartCheck(this.chartSet);
    },
    allCoronaData() {
      this.coronaTable(this.allCoronaData);
    },
  },
  methods: {
    coronaTable(data) {
      for (let i of data) {
        this.tableData.push({
          pref_id: Number(i.pref_id),
          prefecture: i.prefecture,
          cases: Number(i["cases"].today),
          casesRatio: this.comparison(i, "cases"),
          hospitalize: Number(i["hospitalize"].today),
          hospitalizeRatio: this.comparison(i, "hospitalize"),
          discharge: Number(i["discharge"].today),
          dischargeRatio: this.comparison(i, "discharge"),
          severe: Number(i["severe"].today),
          severeRatio: this.comparison(i, "severe"),
          deaths: Number(i["deaths"].today),
          deathsRatio: this.comparison(i, "deaths"),
          pcr: Number(i["pcr"].today),
          pcrRatio: this.comparison(i, "pcr"),
          population: Number(i["population"].today),
        });
      }
    },
    chartCheck(prefCode) {
      const pref = [];
      prefCode.forEach((code) => {
        pref.push(this.prefDataFilter(code));
      });
      this.$store.commit("chart", pref);
    },
  },
};
</script>

<style>
.position-relative th {
  color: white;
  background-color: #3e3d37;
}
.table__plus {
  font-size: 0.7rem;
}
</style>