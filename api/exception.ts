const exceptions = {
  "03eyEi4Of1tAtEyvMSzvAd": "3r2kB4RQqVk",
  "06LxiiiqDciQqzpKGuqgrL": "MjFTMb-NTMo",
  "0Q2bGwvx3oECbpe3W5yyBv": "bs43ajL0sNw",
  "0Q4NqUpiuOnQxYOGjnbuCh": "RUN6Kqd9xgs",
  "0yjvlLbEXnl7mBuCsO1S5w": "-d-Z_Xs-4kg",
  "1BfOpIIUzBRu7dAf68Em9d": "hhnYYMgnPGQ",
  "1vNwRQj10QOLTOTyQYvD0s": "OSeStDEAZJQ",
  "1xk64Uh8arGfz26v0xAfCh": "lIaynTTMBMA",
  "2GgLGm3mDboRPBBYoduB38": "oqK2ZRA9LyQ",
  "2ZLQDrpnOwmXf3RV46aaFH": "zF378T75GvE",
  "2hWUMklWvoXtWFEKAsf9Vs": "6Rd0ZukaoiA",
  "2pcuXnZhTirLXsfXGVFTv2": "cYWYGUDIQvo",
  "3dPtXHP0oXQ4HCWHsOA9js": "mJ1N7-HyH1A",
  "3jHBgKdLCf46aP3HRI0WYv": "PEnJbjBuxnw",
  "3pFq7jNVxfpYzqluxVfv9m": "cpO1wO0xm4c",
  "4Y1SdlmIAdsbd2FvYsDGgO": "PAy_W1Sj51s",
  "4nmjL1mUKOAfAbo9QG9tSE": "OSeStDEAZJQ",
  "4xndTd6SpIVTd9cqCMxoAi": "BPnrfkQ6VdU",
  "5DeMVXFzLexBSuAJOqHGCs": "-yPutXRfKII",
  "5Yiwmn4PZAzVAms9UDICU2": "lV-hbfRmrCk",
  "5vxLi2UkFidUSwo5zOMblu": "ixz3ROVwksE",
  "60EJuhZUOPWGDbxpddUwq5": "ZsaPdoArcRs",
  "6KZlvvzbrOOZAZjzoMEWn9": "KMaQhPLCqWY",
  "6MCjmGYlw6mQVWRFVgBRvB": "mJ1N7-HyH1A",
  "6YgX2nGweV0opGAYHxcLFx": "2y-KbQ4X18k",
  "6s0hf9xfbG7gqcGMXXPJSZ": "QPbiYZao3ls",
  "6thjKtlVjr9KgBXkjm3EGe": "-1odjq3RUi8",
  "7E5oBRxqis4p2kNxwnKDm3": "OLOAl2TeNTY",
  "7lRsXfGnY0PBSxVMIxuHME": "-vGNvSVX2O4",
  "7sVOXV0aWjuTYtCbZdxPQn": "QydzTeVCeAA",
  "09Gy2And4Ys7RtuMUvaLfK": "KMaQhPLCqWY",
  "1xepJNYqtKh9nYHgIqAI5H": "3tlTjy48AzU",
  "2BHj31ufdEqVK5CkYDp9mA": "BBj3SCImk_A",
  "4YOJFyjqh8eAcbKFfv88mV": "O0wBUnAeF6k",
  "4Gjq8ncqm382XgbFRVxn0C": "Lna38ggUKSg",
  "1UvaZaHkh3D9AkmBrrnbFg": "AmAarZYxamY",
  "2IdCKcMOO5FuAGvYqsZ6p3": "vv-Fqm6Qtj4",
  "1DYpAKoMeCFVFq4VpV8yyf": "AdOxk_AYbWs",
  "3gPexObuaesXMGHnRhq1xQ": "H-lm87v8hcA",
  "4kKdvXD0ez7jp1296JmAts": "sE3uRRFVsmc",
  "3eq4fB47As2tjmcqEr2Qh2": "Xh6eAYM3Sfk",
  "0BtlkzG35KuvLqXkzxqtZy": "UZ2-FfXZlAU",
  "2FgdYV9AnS0CTjwoHY42E3": "2wMuXu9FAkc",
  "5RmtuRIe8FJg9FRegwCqzW": "vzT-wb_vd-g",
  "7CQjnYsGLdtcrsp95oBpCv": "JXkySkXDHgM",
  "2Dzzhb1oV5ckgOjWZLraIB": "dQ8YIGKqXLw",
  "0OLXwSgtmrH663aFHNrMkX": "8jLXjDnnsHk",
  "6J4AJS7HB9eN8BupeurCCU": "8jLXjDnnsHk",
  "1hB75n3vHoVQSBOG4iryxd": "X2qM6NbCoe0",
  "3eeNWXYH9g78steJlAdjYz": "x669nWFrLis",
  "3iyIWYne2qShx3WH0a7RuI": "Bu_eNVTdnZA",
  "6ZxPYutGhjLTrcmvcshCa4": "rV1ZJ1wRgUg",
  "2EvkfIfHqmLlKkKc3tcfPw": "CTLCup0tBt8",
  "6E3TudlZucyt2fxE8Ljgw6": "70ocdx2SioY",
  "5Uh1uXAwxHdzeENqcBVZIH": "hy_PexzvC1c",
  "0jIkwj3Yyoip3UTu127UDZ": "iqLnm6NK-5E",
  "6ipIchnzv5WiWPSvlGmhpr": "RQS3necNwKs",
  "1GC1MIaRMW3kfVK9VyD5Ii": "P5yUiK2qNdg",
  "4nS8s5L9HGbyuzxSIwFPZ3": "P5yUiK2qNdg",
  "3AkcIn2ET6hHGnruty5zym": "bJMC071kYlg",
  "6nMOXteXm781VlXHVz9KIK": "qOai5CVENDQ",
  "28vzHyOyXlAkfh8gx8IskR": "GAR_-RX_UW8",
  "5S9YiHarelPAqdLsbHltu9": "RuvfLpOFTwI",
  "2grjqo0Frpf2okIBiifQKs": "DlSsIKn3HTU",
  "5r2qF762ZpWquCfh0LzZjo": "VWPrBOJWO3A",
  "5HLaKYbLSAA1dFjMPpLUZz": "MMbZqsPE0UA",
  "3tEccqjynZhKq0I2rLkus6": "58NKCwjz6e8",
  "151kpPi3ovxdBdryOF1A1i": "D5lLgD4caAo",
  "2Ch5kK5Gn5ZNgZyUnipunk": "4Y3Xc4hfquk",
  "24SUWisv2lYQiB3bVpE1sn": "Lm6DS3BeTdM",
  "0RrhwwIqnfCDPZD7DfWAVj": "oHk4YYGjmHw",
  "4PAgKDI1buYIjRdIIg27zk": "ft-EfzgysnY",
  "7ETSUd74fhHvG2JldNVizV": "olcXwkJZxJk",
  "24RtfqruOcFQMdhJ2oXyXx": "gBzzfXo8A50",
  "39uLYYZytVUwcjgeYLI409": "f7SS57LFPco",
  "33sdJcyi2leaVCFGwshDTX": "jb-FeF0kOf4",
  "4MmHCtWpHxr4ZgHGaZkt5s": "FmTKJVqniMk",
  "2ifJEieMAeQqNM0edwhDqs": "NyPwamTDu80",
  "1BbsV7AEuhmKRqhloDVtvt": "b3e49oSM5co",
  "3kPlIKohsDeVKHtBLUU8jN": "D8UwgBFeIRQ",
  "4zBsAjpFDwQwjdRJp7RP0k": "3kqKk30fV7w",
  "3gCPs1TDRH9v9QlF5h3zD5": "UxM5UgpXYM4",
  "7MGLRs9ZsPiOHSY3zMIjhm": "kgoYtSmPZ8U",
  "1FQES5uT3Na8ON3iB34ZD3": "-BtYpfQY2IA",
  "1zZQCz81Mr1XiiQ7SkRanG": "qYNvTX_ioYo",
  "0b8VjjDxSHMbTz2YyayzZa": "TjqRLIS5-ro",
  "4ELXBKQHnfWiNt6OUcSo15": "7EYcOntuD7s",
  "61TiWkU3iSVDeyFXFNmPEt": "wQDKsxfM0IY",
  "4gJy5K85glxZFufZQFeR8D": "vV7OmRpgXh4",
  "5vWYRXIw88ZKaOjsvFuWus": "7TZx_UhpmEE",
  "2m3Ua8SkTTeTq9WFcdNLXA": "KVZrDysVkIA",
  "6IZF8hi9J6EtFDLQqOlSbu": "XcoyRYIMfzw",
  "1XgQtMoo2drLvh0qRHMvJB": "WxjJsRm65Nw",
  "39iAShH74Usl1yFQeV8dT2": "JqLWgVXkYD8",
  "1mbFlmyw5rJua63zNeDeO2": "jdBWcHTGo9U",
  "5hQ7RvqIQykgOsBOoxJOx8": "FDItdZdooCM",
  "1VVrKAaKXxKHmnKsPsGgic": "Vb5E_u_29pE",
  "4XHQCgN4BrEoERrsoDlsXo": "9rIdxXElSpU",
  "10B0XidWqJbw3JaYtgGyTH": "IEjnnk3wxOQ",
  "29KYUeEtp9lYtuXGUiRMYI": "EhDtCYkCrlU",
  "64rqvMhAPLLEag310IG3z9": "BtAQfFWYrig",
};

export { exceptions };
