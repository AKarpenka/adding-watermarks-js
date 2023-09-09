
run dev:
npm run dev

run build:
npm run build

commit build: 
git add dist -f
git commit -m 'updated dist'
git push origin --delete gh-pages
git subtree push --prefix dist origin gh-pages