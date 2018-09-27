<template slot='Menu'>
	<header>
		<v-navigation-drawer v-model="drawer"
			fixed
			app
			mini-variant-width="61"
			:mini-variant="minimized"
			:mobile-break-point="navigationBreakpoint.sm"
			clipped
		>
			<v-layout column fill-height>
				<v-list>
					<v-list-tile v-for="item in items"
						:key="item.title"
						nuxt
						:to="item.link"
					>
						<v-list-tile-action :title="item.title">
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>{{ item.title }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
				<v-spacer></v-spacer>
				<v-list>
					<v-list-tile @click.prevent="logoutHandler">
						<v-list-tile-action title="Log out">
							<v-icon>exit_to_app</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title> Log out </v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-layout>
		</v-navigation-drawer>
		<v-toolbar fixed
			app
			flat
			:clipped-left="true"
		>
			<v-toolbar-side-icon @click.stop="toolbarHandler"></v-toolbar-side-icon>
			<v-toolbar-title class="hidden-xs-only">
				Eliftech trade
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-title>{{ title }}</v-toolbar-title>
		</v-toolbar>
	</header>
</template>

<script>
export default {
	name: 'Menu',
	data () {
		return {
			minimized: true,
			drawer: true,
			screenSize: 320,
			items: [
				{ title: 'Home', icon: 'dashboard', link: '/' },
				{ title: 'User', icon: 'account_circle', link: '/user' },
				{ title: 'Trade', icon: 'attach_money', link: '/trade' },
				{ title: 'Rates', icon: 'insert_chart', link: '/rates' },
				{ title: 'Help', icon: 'help_outline', link: '/help' },
			],
			navigationBreakpoint: {
			    lg: 800,
				sm: 500
			}
		};
	},
	computed: {
		title () {
			try {
				return this.$route.matched[0].components.default.options.pageTitle;
			} catch (e) {
				return '';
			};
		},
	},
	methods: {
		async logoutHandler () {
			await this.$store.dispatch('form_auth/logout');
			this.$router.push('/login');
		},
		toolbarHandler(evt) {
		    if(this.screenSize >= this.navigationBreakpoint.lg){
				this.drawer = true;
				this.minimized = !this.minimized;
				return
			}
			if(this.screenSize < this.navigationBreakpoint.lg && this.screenSize >= this.navigationBreakpoint.sm){
				this.drawer = true;
				this.minimized = !this.minimized;
				return
			}
		    this.drawer = !this.drawer;
		    this.minimized = false;
		}
	},
	mounted(){
	    if( window ){
	        this.screenSize = window.innerWidth;
	        this.toolbarHandler();
		}
	}
};
</script>

<style>
.maximized .v-btn__content .v-icon {
	color: #555;
}
.v-navigation-drawer {
	padding-bottom: 0;
}
a.v-list__tile {
	padding-left: 0;
	padding-right: 0;
}
.v-list__tile__action {
	margin-left: 5px;
	margin-right: 5px;
	min-width: 50px;
	justify-content: center;
}
.v-list__tile__content {
	margin-left: 15px;
}
.v-navigation-drawer--mini-variant .v-list__tile__action {
	min-width: 50px;
}
.v-toolbar__content {
	padding-left: 20px;
}
</style>