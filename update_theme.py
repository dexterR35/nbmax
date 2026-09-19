"""Apply the supplied NetBet Max blue/navy palette to the existing components."""
from pathlib import Path
import re
p=Path(__file__).resolve().parent/'dist/styles.css'
s=p.read_text()
colours={
'050805':'040b16','121513':'081221','13160f':'09152a','171918':'101727','171b15':'0b1526','191e16':'101f38','1d211b':'0b1629','20221e':'f6f8ff','202220':'192337','21251e':'17223a','22241f':'101b30','222620':'152038','22271e':'16233b','22271f':'142039','232b23':'152643','242523':'0d192d','242822':'17223a','242824':'192740','252923':'172540','262b22':'172643','262b27':'f6f8ff','262c23':'192a49','272a24':'101d34','282a27':'0e1b31','282b26':'112039','292d26':'1d3155','2b2b28':'132440','2b2b29':'112038','343a30':'24467b','394332':'234a86','3a3d37':'2b3951','3b4533':'2c4264','41483b':'324b72','41493b':'34496a','4c5545':'425b83','4f5747':'405a82','52594b':'496285','53594e':'405879','545b49':'41638c','55594e':'456082','555c52':'b5c5e0','5b6353':'5574a4','5e4b2d':'91b2ff','5f635a':'4e6383','616653':'536e99','62664f':'5d80bc','666f59':'5c7ead','676a56':'5578af','686c5f':'6086bd','72765f':'6b90c6','767c75':'899cb9','77613d':'94b4ff','8e9c7e':'7aa0ff','8f7953':'365eb8','969f8f':'9aaac7','978567':'80a6ff','aaa99f':'aebcd4','c4c8ba':'c7d7ee','c7cebf':'d0def3','c8c7bb':'c0cde2','c8cbb3':'d0ddff','cfb786':'8dabff','ddd9cf':'152440','dfd7c4':'dbe6ff','e1cca3':'5579ff','e4dfd3':'122449','e8c57e':'96b7ff','eeebe3':'f7f9ff','f0dbb4':'e8efff','f3dfb4':'d3e1ff'}
def colour(m):
 raw=m.group()[1:];base=raw[:6].lower()
 return '#'+colours.get(base,base)+raw[6:]
s=re.sub(r'#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?\b',colour,s)
s=s.replace("--serif:Georgia,'Times New Roman',serif;","--serif:Arial,Helvetica,sans-serif;\n  --blue:#244bff;\n  --red:#ee2347;")
p.write_text(s)
