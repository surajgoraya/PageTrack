const baseURL = '/api';

const app = new Vue({
    el: '#app',
    data: {
        version: '0.0.0',
        error: false,
        trackedSites: [],
        message: '',
        newSite: '',
        newTag: ''
    },
    mounted: function(){
        fetch(`${baseURL}/version`)
        .then(async e=>{
            if (e.status === 200){
                const json = await e.json();
                this.version = json.version;
            } else {
                this.error = true;
                this.message = e.statusText;
            }
        })
        .catch(e=>{this.message = e; this.error = true;});

        fetch(`${baseURL}/tracked`)
        .then(async e=>{
            if(e.status === 200){
                const json = await e.json();
                this.trackedSites = json.trackedSites;
            }
            else {
                this.error = true;
            }
        })
        .catch(e=>{this.error = true; this.message = e});
    },
    methods: {
        onSiteChange: function(e){
            const site = e.target.value;
            this.newSite = site;
        },
        onTagChange: function(e){
            const tag = e.target.value;
            this.newTag = tag;
        },
        submitSite: function(){
            fetch(`${baseURL}/add`, { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({site: this.newSite, tag: this.newTag})})
            .then(e=>{
                if(e.status=== 200){
                    location.reload();
                } else {
                    this.error = true;
                }
            })
            .catch (e=> { this.error = true; this.message = e });
        }
    }

});
