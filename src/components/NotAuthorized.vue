<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" sm="12">
        <v-card class="text-center pa-5 elevation-3">
          <v-card-title class="text-h4">
            <v-icon size="36" color="red" class="mr-2">mdi-alert-circle</v-icon>
            401 - Not Authorized
          </v-card-title>
          <v-card-text>
            <p>You do not have permission to access this page.</p>
            <v-btn color="primary" @click="$router.push('/')">Go to Home</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NotAuthorized",
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
.v-card {
  background-color: #f9f9f9;
}
.v-card-title {
  font-weight: bold;
}
.v-icon {
  vertical-align: middle;
}
.v-btn {
  margin-top: 20px;
}
</style>
