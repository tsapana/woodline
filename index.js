let FindItem = {
	template:'#find_item_template',
	props:{
		searchtext: {
			type: String, default: null,
		},
	},
	data(){
		return{
			value: this.searchtext
		}
	},
	methods:{
		dosearch(){
			this.$emit('dosearch', this.value)
		}
	}
}

let SortItem = {
	template:'#sort_item_template',
	
	props:{	
		name:{
			type: String, default: null,
		},
		selectedItem:{
			type: String, default: null,
		}
	},
	computed:{
		isSelected() {
			return this.name === this.selectedItem
		}
	},
	methods:{
		select(){
			this.$emit('select', this.name)
		}
	}
}

let FilterItem = {
	template:'#filter_item_template',
	props: {	
		value: {type: String, default:''},
		id: {type: Number},
		selectedfilter:{type: Array, default:[]}
	},
	computed:{
		isSelected() {
			var res = false;
			if (this.selectedfilter.length>0)
				res = this.selectedfilter.includes(this.value);
			return res;
		}
	},
	methods:{
		select(){
			this.$emit('select', this.value)
		}
	}
}

let AuthorInfoCard = {
	template:'#author-card-template',
	props:{
		photoUrl: {
			type: String,
		},
		city: {
			type: String, default: ''
		},
		name: {
			type: String, default: ''
		},
		description: {
			type: String, default: ''
		},
		phoneNumber: {
			type: String, default: ''
		},
		email: {
			type: String, default: ''
		},
		toDofilters: {
			type: Array, default: function () { return [] }
		},
		id: {
			type: Number
		},
		selectedauthors:{
			type: Array, default: function () { return [] }
		},
		
	},
	computed:{
		isSelected() {
			var res = false;
			if (this.selectedauthors.length>0)
				res = this.selectedauthors.includes(this.id);
			return res;
		}
	},
	methods:{
		select(){
			this.$emit('select', this.id)
		}
		
	},
}
let AuthorList = {
	template:'#author-list-template',
	props:{
		imageurl:{
			type: String, default:''
		},
		sortby:{
			type: String, default:''
		},
		searchvalue:{
			type: String, default:''
		},
		selectedfilter:{
			type: Array, default: function () { return [] }
		}, 
		selectedAuthors:{
			type: Array , default: function () { return [] }
		},
		filter:{ type: String, default: null}
	},
	components:{
		author: AuthorInfoCard,
	},
	data(){
		return {
			authorsList: [
				{photoUrl: this.imageurl, id:1, city:'Moscow', phoneNumber:'040302482', email:'test@test.ru', name: 'Ivan Petrov', toDofilters:['kitchen','cupboard','wardrobe','hallway'],	description:'Some information tetx about author job'},
				{photoUrl: this.imageurl, id:2, city:'Voronezh', phoneNumber:'563728492', email:'test@test.ru', name: 'Dmitry Ivanov', toDofilters:['table','cupboard'], description:'Some information tetx about author job'},
				{photoUrl: this.imageurl, id:3, city:'St-Petersburg', phoneNumber:'355589211', email:'test@test.ru', name: 'Svetlana Voronova', toDofilters:['cupboard','wardrobe'], description:'Some information tetx about author job'},
				{photoUrl: this.imageurl, id:4, city:'Moscow', phoneNumber:'349876576', email:'test@test.ru', name: 'Igor Smirnov', toDofilters:['kitchen'], description:'Some information tetx about author job'},
				{photoUrl: this.imageurl, id:5, city:'Archangelsk', phoneNumber:'345765432', email:'test@test.ru', name: 'Ivan Mikhalkov', toDofilters:['kitchen','hallway'], description:'Some information tetx about author job'},
				{photoUrl: this.imageurl, id:6, city:'St-Petersburg', phoneNumber:'234567898', email:'test@test.ru', name: 'Svetlana Voronova', toDofilters:['wardrobe'], description:'Some information tetx about author job'},
				{photoUrl: this.imageurl, id:7, city:'Moscow', phoneNumber:'353523444', email:'test@test.ru',name: 'Pert Filatov', toDofilters:['table'], description:'Some information tetx about author job'},
				{photoUrl: this.imageurl, id:8, city:'Barnaul', phoneNumber:'356921110', email:'test@test.ru', name: 'Oleg Lebedev',toDofilters:['table','bureau'], description:'Some information tetx about author job'},
				{photoUrl: this.imageurl, id:9, city:'St-Petersburg', phoneNumber:'234910964', email:'test@test.ru', name: 'Victor Ivanov', toDofilters:['cupboard','bureau'], description:'Some information tetx about author job'},
				{photoUrl: this.imageurl, id:10, city:'St-Petersburg', phoneNumber:'345678765', email:'test@test.ru', name: 'Sergey Vasilyev', toDofilters:['hallway'], description:'Some information tetx about author job'},
			],
		}
	},
	computed: {
		orderedAuthors: function () {		
			var param = {sort: this.sortby, filters : this.selectedfilter, search: this.searchvalue };
			var resultList = this.authorsList;
			if (param.search){
				resultList = resultList.filter(author => {
					return author.name.toLowerCase().includes(param.search.toLowerCase())
				});
			}
			if (param.filters.length>0){
				resultList = resultList.filter(author => {
					 return author.toDofilters.some(function(filter) {
						return param.filters.includes(filter);
					});  
				});
			}
			if (param.sort){
				resultList.sort( function( a, b ){
					return ( ( a[param.sort] == b[param.sort] ) ? 0 : ( ( a[param.sort] > b[param.sort] ) ? 1 : -1 ) );
				}.bind(this));
			}
			return resultList;
			
		}
	},
	methods:{
		sortAuthorsByName(){
			this.authorsList.sort( function( a, b ){
				return ( ( a.name == b.name ) ? 0 : ( ( a.name > b.name ) ? 1 : -1 ) );
			}.bind(this));
		},
		sortAuthorsByCity(){
			this.authorsList.sort( function( a, b ){
				return ( ( a.city == b.city ) ? 0 : ( ( a.city > b.city ) ? 1 : -1 ) );
			}.bind(this));
		},
		selectAuthor(authorId){
			var author = this.selectedAuthors.filter(author => {
					return author == authorId
				});
			if(author.length>0){
				var index = this.selectedAuthors.indexOf(authorId);
				this.selectedAuthors.splice(index, 1);
			}else{
				this.selectedAuthors.push(authorId);
				
			}
			this.$emit('change', this.selectedAuthors);
		},
	}
}

var app = new Vue({
    el: '#app',
	components:{
		'sort-item': SortItem,
		'filter-item': FilterItem,
		'find-item': FindItem,
		'author-info-list': AuthorList
	},
    data(){
		return {
			searchFieldValue:'',
			selectedFilterOptions:[],
			sortOptions:['name', 'city'],
			countSelectedAuthors: 0,
			filterOptions:[
				{id: 0, value:'kitchen'},
				{id: 1, value:'bureau'},
				{id: 2, value:'cupboard'},
				{id: 3, value:'table'},
				{id: 4, value:'wardrobe'},
				{id: 5, value:'hallway'},
			],
			selectedSortItem: 'name',
			imageUrl:'content/img/empty-photo.jpg',
			filter: '',
			description: '',
			city:'',
			phoneNumber:'',
			name:'',
			email:'',
			value:'',
		}
	},
	computed:{
		isSelectedAuthors(){
			return this.countSelectedAuthors>0;
		}
	},
	methods: {
		selectSortType(type){
			this.selectedSortItem = type;
		},
		selectFilters(filterType){
			var index = this.selectedFilterOptions.indexOf(filterType);
			if(index === -1){
				this.selectedFilterOptions.push(filterType);
			}else{
				this.selectedFilterOptions.splice(index, 1);
			}
		},
		changedSelectedAuthors(authorsList){
			this.countSelectedAuthors = authorsList.length;
			
		},
		doSearch: function(val) {
			this.searchFieldValue = val;
		},
	},
})

