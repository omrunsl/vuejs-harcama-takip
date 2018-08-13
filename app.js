const app = new Vue({
	el: '#app',
	name: 'Harcama Takip',
	data: {
		dataItem: { Title: '', Price: '', List: ''},
		dataList: [
				{Id: 1, Title: 'domates', Price: 3, List: 'Pazar'},
				{Id: 2, Title: 'peynir', Price: 12, List: 'Market'},
				{Id: 3, Title: 'benzin', Price: 50, List: 'Yakıt'}
		],
		listItems: [
			{Id: 1, Title: 'Genel'},
			{Id: 2, Title: 'Pazar'},
			{Id: 3, Title: 'Market'},
			{Id: 4, Title: 'Yakıt'}
		],
		newListItem: {},
		activeListItem: {},
		filteredeDataList: []
	},
	created() {
		const defaultListItem = this.listItems[0];
		if (defaultListItem != null) {
			this.changeListItem(defaultListItem.Id);
		}
	},
	methods: {
		saveItem() {
			if (this.dataItem.Title != "" && this.dataItem.Price != '') {
				this.dataItem.Id = this.dataList.length + 1;
				this.dataItem.List = this.activeListItem.Title;
				this.dataList.push(this.dataItem);
				this.clearForm();
				this.changeListItem(this.activeListItem.Id);
			}
		},
		clearForm() {
			this.dataItem = { Title: '', Price: ''}
		},
		listItemSave() {
			if (this.newListItem.Title != null) {
				this.newListItem.Id = this.listItems.length + 1;
				this.listItems.push(this.newListItem);
				this.newListItem = {};
			}
		},
		deleteItem(id) {
			this.dataList = this.dataList.filter(x => x.Id !== id);
		},
		changeListItem(id) {
			const listItem = this.listItems.find(x => x.Id === id);
			if (listItem != null) {
				this.activeListItem = listItem;
				this.filteredeDataList = this.dataList.filter(item => item.List === listItem.Title);
			}
		},
		listItemCount(title) {
			return this.dataList.filter(item => item.List === title).length;
		}
	},
	computed: {
		harcamaListSon() {
			return this.filteredeDataList.filter(item => item.List === this.activeListItem.Title);
		},
		harcamaListTop() {
			let array = this.filteredeDataList.filter(item => item.List === this.activeListItem.Title);
			let total = 0;
			for (i = 0; i < array.length; i++) {
				total += parseInt(array[i]["Price"]);
			}
			return total;
		}
	}
})