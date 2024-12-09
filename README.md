# Laravel + React + TypeScript + Inertia を使用したTodoアプリ
<img width="1440" alt="スクリーンショット 2024-08-18 19 33 57" src="https://github.com/user-attachments/assets/3f1e9d41-df1f-4157-bbfe-a82a90deb8f8">

## 要件定義  
 * Todo
   * team_idがNULLのものは個人Todoとして管理する
   * team_idがあるものはチームのTodoとして管理する
       
 * 管理者
   * ユーザーの一覧が閲覧可能
   * ユーザーの登録・削除が可能
   * ユーザーをチームに加入・脱退させることが可能
   * 管理者はチームに加入できないものとする
   * 既存のユーザー登録とは別にユーザーの登録が可能
   * ユーザー登録時に管理者フラグをTRUEに設定したユーザーに関しては管理者として扱う
   * user_idが『1』の管理者に関しては削除不可、他の管理者ユーザーに関しては削除が可能
   * チームのTodoは管理者のみ作成・編集・削除が可能
   * 個人Todoの**CRUD**が可能

 * ユーザー
   * チームに属してる場合、チームTodoが閲覧可能
   * 複数チームに所属可能
   * 同チームの他ユーザーのTodoを閲覧可能
   * 個人Todoの**CRUD**が可能

## 主な機能
### 管理者・ユーザー共通機能(Todo)  
 <details><summary>Todo一覧表示</summary>

  ### ユーザーが作成したTodoを一覧にて確認可能
  ![image](https://github.com/user-attachments/assets/05942ef9-a2ff-4ed6-8161-c72ccd3997ea)
 </details>
 
 <details><summary>一覧に表示するTodoデータがない場合の表示</summary>

  ### Todoデータがない場合
  ![image](https://github.com/user-attachments/assets/ed932b9c-daa4-47c8-ac74-1564a5db36a4)
 </details>


- CRUD機能
 <details><summary>Todo新規作成</summary>

  ### TodoをTodo作成モーダルにて作成することが可能
  ![image](https://github.com/user-attachments/assets/d9dafe33-ab0c-4b1b-bb86-623c14a60bfb)
  ![image](https://github.com/user-attachments/assets/55555a95-4c49-460c-b7f7-9203d899db34)
 </details>
 
 <details><summary>Todo詳細表示</summary>

  ### 詳細ページにてTodo詳細を確認することが可能
  ![image](https://github.com/user-attachments/assets/ffd88a08-6028-4452-aac8-b52210094277)
 </details>
 
 <details><summary>Todo編集機能</summary>

  ### Todoを編集フォームにて編集することが可能
  ![image](https://github.com/user-attachments/assets/9e1c64af-dbcb-4be1-9f1c-9d3a367c9009)
  ![image](https://github.com/user-attachments/assets/c10ab2ce-c9b4-44dc-8bac-fb87df58fd37)
 </details>
 
 <details><summary>Todo削除機能</summary>

  ### Todoを削除することが可能
  ![image](https://github.com/user-attachments/assets/a9b3f6fa-a658-4988-815f-cdb9335ea8a8)
  ![image](https://github.com/user-attachments/assets/507a4eff-30fb-45db-9360-f4e21d3bc736)
 </details> 

 - その他
 <details><summary>フラッシュメッセージ</summary>

  ### 例外時
  ![image](https://github.com/user-attachments/assets/d7234018-0dae-4d93-b12e-7dd6d3bb528c)

  ### 処理成功時
  ![image](https://github.com/user-attachments/assets/55555a95-4c49-460c-b7f7-9203d899db34)

 </details>
 <details><summary>バリデーション</summary>
      
  ### Todo作成・編集時のバリデーション処理
  ![image](https://github.com/user-attachments/assets/9d24a587-bfba-4bad-b72b-f7c81a1090a0)
 </details>

### 管理者側の機能 
  <details><summary>ユーザーの一覧表示</summary>

   ### ユーザーを一覧にて確認可能
   ![image](https://github.com/user-attachments/assets/1f58a3b8-c65e-432f-8f9d-95d4f953a96f)
  </details>
  
  <details><summary>ユーザーの新規登録機能</summary>

   ### ユーザーの新規登録が可能
   ![image](https://github.com/user-attachments/assets/a313fcc6-a5ff-4bc0-9a8b-50d335014d5a)

  </details>  

  <details><summary>ユーザーの削除機能</summary>

   ### ユーザーの削除が可能　
   ![image](https://github.com/user-attachments/assets/e67e2953-8004-4650-a165-7a89c3d0d390)
  </details>  

  <details><summary>ユーザーのチーム加入・脱退機能</summary>

   ### ユーザーをチームに加入させることが可能　
   ![image](https://github.com/user-attachments/assets/4c773a4c-c757-4a65-b4b2-24d5283d7e03)

   ### ユーザーをチームから脱退させることが可能
   ![image](https://github.com/user-attachments/assets/8e2ec714-f360-41d6-b335-2f8ec2fcc031)
  </details> 

  <details><summary>チームTodoの一覧表示</summary>

   ### チームTodoを一覧にて確認可能
   ![image](https://github.com/user-attachments/assets/cc308adb-6a0b-4459-8715-8fdae95cffe5)
  </details>
  
- CRUD機能
<details><summary>チームTodo作成機能</summary>

 ### TodoをTodo作成モーダルにて作成することが可能
 ![image](https://github.com/user-attachments/assets/5d96b4c4-6ec6-43dd-b255-a23bcbd1dd2f)
</details>

<details><summary>チームTodo詳細表示</summary>
 
 ### 詳細ページにてTodo詳細を確認することが可能
 ![image](https://github.com/user-attachments/assets/e4caf3a9-f1b8-4e71-a5c5-f18037f5a2bc)
</details>
 
<details><summary>チームTodo編集機能</summary>

 ### Todoを編集フォームにて編集することが可能
 ![image](https://github.com/user-attachments/assets/9696f159-ac9b-4f38-a1c4-60a9bb281c10)
</details>

<details><summary>チームTodo削除機能</summary>

 ### Todoを削除することが可能
 ![image](https://github.com/user-attachments/assets/38c48420-b832-4f8a-b6c9-4e3f93fc9f75)
</details> 
 
### ユーザー側の機能
  
 <details><summary>ログイン機能</summary>

  ### ユーザーのログインが可能
  <img width="1440" alt="スクリーンショット 2024-08-18 19 51 02" src="https://github.com/user-attachments/assets/1e4f4271-e925-4665-b9ab-5155e5d45d5e">
 </details>
 <details><summary>ユーザーの新規登録機能</summary>

  ### ユーザーの新規登録が可能
  <img width="1437" alt="スクリーンショット 2024-08-18 19 53 29" src="https://github.com/user-attachments/assets/014e947e-812c-448f-ba55-534a47463457">
 </details>

 <details><summary>ダッシュボード表示</summary>

  ### ダッシュボードにて本日のTodoとチームTodoを確認することが可能
  ![image](https://github.com/user-attachments/assets/9c820ca3-4c22-486b-afa5-f2fbbda80ecd)
 </details>

 <details><summary>ユーザー所属チームリスト・ユーザー所属チーム他ユーザーのTodo一覧</summary>

  ### ユーザー所属チームリストとユーザー所属チームの他ユーザーのTodoを確認することが可能
  ![image](https://github.com/user-attachments/assets/8d76e95f-4dff-44a5-8418-ad8a93ee6564)
 </details>


## ER図
![image](https://github.com/user-attachments/assets/ce8be1e8-c1c7-49bc-a349-e80da18c641a)


